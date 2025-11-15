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
        if(p&&typeof p.then==='function') p.catch(function(e){console.warn('fetch failed (early wrapper):',e)});
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
