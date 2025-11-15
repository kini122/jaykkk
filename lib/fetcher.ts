export type FetchOptions = RequestInit & {
  timeout?: number
  retries?: number
  retryDelay?: number
}

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}

export class FetchError extends Error {
  public response?: Response
  public status?: number
  public details?: any
  constructor(message: string, response?: Response, details?: any) {
    super(message)
    this.name = 'FetchError'
    this.response = response
    this.status = response ? response.status : undefined
    this.details = details
  }
}

export async function fetchWithTimeout(input: RequestInfo, init?: FetchOptions): Promise<Response> {
  const timeout = init?.timeout ?? 15000
  const retries = init?.retries ?? 0
  const baseDelay = init?.retryDelay ?? 500

  // clone options for each attempt
  const attempt = async (attemptNumber: number): Promise<Response> => {
    // Ensure AbortController available
    const Controller = (typeof AbortController !== 'undefined') ? AbortController : undefined
    const controller = Controller ? new Controller() : null
    const signal = controller ? controller.signal : undefined

    if (init && 'signal' in init && (init as any).signal && controller) {
      // If a signal was provided by caller, propagate abort
      (init as any).signal.addEventListener('abort', () => controller.abort())
    }

    const timeoutId = (typeof window !== 'undefined' && typeof window.setTimeout === 'function')
      ? window.setTimeout(() => controller && controller.abort(), timeout)
      : 0

    try {
      if (typeof fetch !== 'function' && typeof globalThis.fetch !== 'function') {
        throw new FetchError('Fetch API is not available in this environment', undefined, null)
      }
      const fn = (typeof fetch === 'function') ? fetch : (globalThis.fetch as any)
      const response = await fn(input, { ...(init || {}), signal })
      if (!response || !response.ok) {
        const text = response ? await safeReadResponse(response) : null
        const status = response ? response.status : 0
        throw new FetchError(`HTTP error: ${status}`, response, text)
      }
      return response
    } catch (err: any) {
      // If aborted due to timeout, treat accordingly
      const isAbort = err && (err.name === 'AbortError' || err.message === 'The user aborted a request.')
      if (attemptNumber < retries && !isAbort) {
        const backoff = baseDelay * Math.pow(2, attemptNumber)
        await delay(backoff)
        return attempt(attemptNumber + 1)
      }
      if (err instanceof FetchError) throw err
      // Provide clearer network error messages
      const message = err && err.message ? err.message : String(err)
      throw new FetchError(message.includes('Failed to fetch') ? 'Network request failed (check CORS or connectivity)' : message, undefined, err)
    } finally {
      if (typeof window !== 'undefined' && typeof window.clearTimeout === 'function') clearTimeout(timeoutId)
    }
  }

  return attempt(0)
}

async function safeReadResponse(res: Response) {
  try {
    const ct = res.headers.get('content-type') || ''
    if (ct.includes('application/json')) return await res.json()
    return await res.text()
  } catch (e) {
    return null
  }
}
