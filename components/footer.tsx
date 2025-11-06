"use client"

import { Instagram, Linkedin, Facebook } from "lucide-react"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-muted-foreground">
        <div className="uppercase tracking-widest text-xs">© {year} jaykarun.com — ALL RIGHTS RESERVED</div>
        <div className="mt-2 text-xs">Web Design by <span className="font-semibold">Kozker Tech</span></div>

        <div className="mt-4 flex items-center justify-center gap-4">
          <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-foreground">
            <Instagram size={16} />
          </a>
          <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-foreground">
            <Facebook size={16} />
          </a>
          <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground">
            <Linkedin size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
