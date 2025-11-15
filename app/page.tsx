import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Intro } from "@/components/sections/intro"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="pt-16 md:pt-16 lg:pt-20">
      <SiteHeader />
      <Hero />
      <Intro />
      <Footer />
    </main>
  )
}
