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

    // Wrap global fetch to avoid third-party synchronous throws causing DevOverlay runtime errors
    try {
      if (!(window as any).__fetchWrapped) {
        const origFetch = window.fetch.bind(window)
        ;(window as any).__originalFetch = origFetch
        (window as any).__fetchWrapped = true
        window.fetch = function (...args: any[]) {
          try {
            const result = origFetch(...args)
            if (result && typeof result.then === 'function') {
              // attach a catch handler immediately to prevent unhandled rejection events
              result.catch((err: any) => {
                console.warn('fetch failed (wrapped):', err)
                // let the original promise remain rejected so callers can handle it
              })
              return result
            }
            return result
          } catch (err) {
            console.warn('fetch synchronous error (wrapped):', err)
            const p = Promise.reject(err)
            // attach handler so it's not an unhandled rejection
            p.catch(() => {})
            return p
          }
        }
      }
    } catch (e) {
      // silent - do not break app if environment prevents replacing fetch
      console.warn('Failed to wrap fetch:', e)
    }
  }, [])

  return <Analytics />
}
