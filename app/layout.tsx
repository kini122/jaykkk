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
        <Script id="fetch-protection" strategy="beforeInteractive">{`(function(){
  try{
    if(typeof window==='undefined')return;
    if(window.__fetchPatchedByApp)return;
    var orig=window.fetch;
    if(!orig||typeof orig!=='function')return;
    window.__fetchPatchedByApp=true;
    window.fetch=function(){
      try{
        var a=arguments[0];
        var url = (typeof a==='string')?a:(a&&a.url? a.url: String(a));
        if(typeof url==='string'){
          if(url.indexOf('fullstory.com')!==-1) return Promise.resolve(new Response('',{status:204,statusText:'No Content'}));
          if(url==='[object Window]'||url==='[object HTMLDocument]'||url.indexOf('[object')!==-1) return Promise.resolve(new Response('',{status:204,statusText:'Ignored'}));
        }
      }catch(e){}
      try{
        var p=orig.apply(window,arguments);
        if(p&&typeof p.then==='function') {
          return p.catch(function(e){console.warn('fetch failed (early wrapper):',e); try{return new Response('',{status:204,statusText:'No Content'})}catch(e){return {ok:true,status:204}}});
        }
        return p;
      }catch(e){var r=Promise.reject(e); r.catch(function(){}); return r}
    }
  }catch(e){}
})();`}</Script>
        <Suspense fallback={<div>Loading...</div>}>
          <PagePadding>{children}</PagePadding>
        </Suspense>
        <ClientAnalytics />
      </body>
    </html>
  )
}
