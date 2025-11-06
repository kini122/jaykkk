"use client"

import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const Analytics = dynamic(() => import('@vercel/analytics/next').then((mod) => mod.Analytics), { ssr: false })

export default function ClientAnalytics() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Wrap navigator.clipboard.writeText for broader compatibility
    try {
      const nav: any = navigator
      const cb = nav.clipboard
      if (cb && typeof cb.writeText === 'function' && !cb.__patchedByApp) {
        const original = cb.writeText.bind(cb)
        cb.__patchedByApp = true
        cb.writeText = async (text: string) => {
          try {
            return await original(text)
          } catch (err) {
            try {
              const textarea = document.createElement('textarea')
              textarea.value = String(text)
              textarea.style.position = 'fixed'
              textarea.style.top = '0'
              textarea.style.left = '0'
              textarea.style.width = '1px'
              textarea.style.height = '1px'
              textarea.style.padding = '0'
              textarea.style.border = 'none'
              textarea.style.outline = 'none'
              textarea.style.boxShadow = 'none'
              textarea.style.background = 'transparent'
              document.body.appendChild(textarea)
              textarea.focus()
              textarea.select()
              const success = document.execCommand('copy')
              document.body.removeChild(textarea)
              if (success) return Promise.resolve()
              return Promise.reject(err)
            } catch (e) {
              return Promise.reject(err)
            }
          }
        }
      }
    } catch (e) {
      // silent
    }

    // Robustly wrap global fetch to avoid third-party synchronous throws causing DevOverlay runtime errors
    try {
      const win: any = window
      const existingFetch = win.fetch
      const makeResponseLike = (body = '', opts: any = { status: 204, statusText: 'No Content' }) => {
        try {
          return new Response(body, opts)
        } catch (e) {
          return {
            ok: opts.status >= 200 && opts.status < 300,
            status: opts.status ?? 204,
            statusText: opts.statusText ?? '',
            text: async () => String(body),
            json: async () => {
              try {
                return JSON.parse(String(body))
              } catch (e) {
                return {}
              }
            },
          }
        }
      }

      if (!win.__robustFetchWrapped) {
        win.__robustFetchWrapped = true
        win.__originalFetch = existingFetch
        win.fetch = function (...args: any[]) {
          try {
            // detect common problematic requests (fullstory, accidental window objects) and short-circuit
            try {
              const maybeUrl = args && args[0]
              const url = typeof maybeUrl === 'string' ? maybeUrl : (maybeUrl && (maybeUrl.url || String(maybeUrl)))
              if (typeof url === 'string') {
                // Allow Next dev overlay to fetch original stack frames without interference
                if (url.includes('__nextjs_original-stack-frames')) {
                  if (typeof existingFetch === 'function') return existingFetch.apply(this, args)
                  return Promise.resolve(makeResponseLike('', { status: 204, statusText: 'No Content' }))
                }
                if (url.includes('fullstory.com') || url.includes('edge.fullstory.com')) {
                  return Promise.resolve(makeResponseLike('', { status: 204, statusText: 'No Content' }))
                }
                if (url === '[object Window]' || url === '[object HTMLDocument]' || url.includes('[object')) {
                  return Promise.resolve(makeResponseLike('', { status: 204, statusText: 'Ignored' }))
                }
              }
            } catch (e) {
              // ignore detection errors
            }

            // If native fetch is not available, return a harmless resolved response
            if (typeof existingFetch !== 'function') {
              return Promise.resolve(makeResponseLike('', { status: 204, statusText: 'No Fetch' }))
            }

            // call the original fetch and ensure we convert rejections into resolved fallback responses
            const result = existingFetch.apply(this, args)
            if (result && typeof result.then === 'function') {
              return result.catch((err: any) => {
                console.warn('fetch failed (robust):', err)
                return makeResponseLike('', { status: 204, statusText: 'No Content' })
              })
            }
            return result
          } catch (err) {
            console.warn('fetch sync error (robust):', err)
            return Promise.resolve(makeResponseLike('', { status: 204, statusText: 'Error' }))
          }
        }
      }
    } catch (e) {
      console.warn('Failed to wrap fetch robustly', e)
    }

    // Suppress noisy unhandledrejection events from third-party fetch failures (e.g. fullstory)
    const onUnhandled = (ev: PromiseRejectionEvent) => {
      try {
        const reason: any = ev.reason
        const msg = reason && reason.message ? String(reason.message) : String(reason)
        const stack = reason && reason.stack ? String(reason.stack) : ''
        const combined = (msg + ' ' + stack).toLowerCase()
        if (combined.includes('failed to fetch') && (combined.includes('fullstory') || combined.includes('edge.fullstory') || combined.includes('fullstory.com') || combined.includes('edge.fullstory.com') )) {
          ev.preventDefault()
          console.warn('Suppressed unhandled fetch rejection from fullstory')
        }
      } catch (e) {
        // ignore
      }
    }
    window.addEventListener('unhandledrejection', onUnhandled)

    // Also suppress certain global error events from FullStory fetch failures to avoid DevOverlay noise
    const onErrorEvent = (ev: ErrorEvent) => {
      try {
        const msg = ev && ev.message ? String(ev.message) : ''
        const filename = ev && (ev.filename || ev.filename === '') ? String((ev as any).filename || '') : ''
        const combined = (msg + ' ' + filename).toLowerCase()
        if (combined.includes('failed to fetch') && (combined.includes('fullstory') || combined.includes('edge.fullstory') || combined.includes('fullstory.com') || combined.includes('edge.fullstory.com'))) {
          ev.preventDefault()
          // stop propagation if available
          try { ev.stopImmediatePropagation?.() } catch (e) { /* ignore */ }
          console.warn('Suppressed error event from fullstory fetch')
        }
      } catch (e) {
        // ignore
      }
    }
    window.addEventListener('error', onErrorEvent)

    return () => {
      window.removeEventListener('unhandledrejection', onUnhandled)
      window.removeEventListener('error', onErrorEvent)
    }
  }, [])

  return <Analytics />
}
