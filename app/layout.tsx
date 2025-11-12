import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { Playfair_Display } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import Script from 'next/script'
import ClientAnalytics from "@/components/client-analytics"
import PagePadding from "@/components/page-padding"


export const metadata: Metadata = {
  title: "jaykarun.com",
  description: "Visual Artist — Portfolio and Available Works",
  generator: "v0.app",
}

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* use sans for body, expose serif variable for headings */}
      <body className={`font-sans ${GeistSans.variable} ${playfair.variable} antialiased`}>
        <style>{` :root { --header-h: 4rem; } @media (min-width: 1024px){ :root { --header-h: 5rem; } } @media (min-width: 1024px){ #home .hero-aspect{ margin-top: var(--header-h) !important; } main{ padding-top: 0 !important; } } `}</style>
        <Suspense fallback={<div>Loading...</div>}>
          <PagePadding>{children}</PagePadding>
        </Suspense>
        <ClientAnalytics />
      </body>
    </html>
  )
}
