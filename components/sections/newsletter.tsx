"use client"

import { useState } from "react"

export function Newsletter() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function validateEmail(e: string) {
    return /\S+@\S+\.\S+/.test(e)
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    setError(null)
    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }
    // Simulate successful submission (no external service required)
    setSubmitted(true)
  }

  return (
    <section id="newsletter" className="section bg-white" style={{ padding: '68px 0 11px' }}>
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="font-serif text-3xl md:text-4xl tracking-tight leading-relaxed md:leading-relaxed text-center" style={{ padding: '4px 0 17px' }}>Sign up to my newsletter for exclusive updates, <br />offers and invitations.</h2>

        {!submitted ? (
          <form onSubmit={onSubmit} className="mt-4 flex justify-center" style={{ marginTop: '16px' }}>
            <div className="w-full grid grid-cols-12" style={{ gap: '16px', alignItems: 'center', width: '100%' }}>
              <input
                aria-label="First Name"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="col-span-12 md:col-span-3 border border-border bg-card px-4 py-3 placeholder:text-muted-foreground text-foreground"
              />
              <input
                aria-label="Last Name"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="col-span-12 md:col-span-3 border border-border bg-card px-4 py-3 placeholder:text-muted-foreground text-foreground"
              />
              <input
                aria-label="Email Address"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-12 md:col-span-4 border border-border bg-card px-4 py-3 placeholder:text-muted-foreground text-foreground"
              />
              <button
                type="submit"
                className="col-span-12 md:col-span-2 bg-foreground text-background px-6 py-3 font-semibold justify-self-end"
                style={{ backgroundColor: 'black', color: 'white' }}
              >
                Sign Up
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-8 flex justify-center">
            <div className="mx-auto max-w-4xl text-center text-sm md:text-base leading-relaxed">
              <p>
                Thank you for joining my mailing list , I look forward to sharing my news updates, exhibition
                invitations and exclusive offers with you!
              </p>
            </div>
          </div>
        )}

        {!submitted && (
          <p className="mt-6 text-center text-sm text-muted-foreground">We respect your privacy and will never share your information.</p>
        )}

        {error && <p className="mt-4 text-center text-sm text-destructive">{error}</p>}
      </div>
    </section>
  )
}
