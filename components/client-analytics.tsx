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
                  return existingFetch.apply(this, args)
                }
                if (url.includes('fullstory.com') || url.includes('edge.fullstory.com')) {
                  try {
                    return Promise.resolve(new Response('', { status: 204, statusText: 'No Content' }))
                  } catch (e) {
                    return Promise.resolve({ ok: true, status: 204 } as any)
                  }
                }
                if (url === '[object Window]' || url === '[object HTMLDocument]' || url.includes('[object')) {
                  try {
                    return Promise.resolve(new Response('', { status: 204, statusText: 'Ignored' }))
                  } catch (e) {
                    return Promise.resolve({ ok: true, status: 204 } as any)
                  }
                }
              }
            } catch (e) {
              // ignore detection errors
            }

            // call the original fetch and ensure we convert rejections into resolved fallback responses
            const result = existingFetch.apply(this, args)
            if (result && typeof result.then === 'function') {
              return result.catch((err: any) => {
                console.warn('fetch failed (robust):', err)
                try {
                  return new Response('', { status: 204, statusText: 'No Content' })
                } catch (e) {
                  return { ok: false, status: 204 } as any
                }
              })
            }
            return result
          } catch (err) {
            console.warn('fetch sync error (robust):', err)
            try {
              return Promise.resolve(new Response('', { status: 204, statusText: 'Error' }))
            } catch (e) {
              return Promise.resolve({ ok: false, status: 204 } as any)
            }
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
        if (msg.toLowerCase().includes('failed to fetch') && stack.includes('fullstory')) {
          ev.preventDefault()
          // optional: log once
          console.warn('Suppressed unhandled fetch rejection from fullstory')
        }
      } catch (e) {
        // ignore
      }
    }
    window.addEventListener('unhandledrejection', onUnhandled)

    return () => {
      window.removeEventListener('unhandledrejection', onUnhandled)
    }
  }, [])

  return <Analytics />
}
