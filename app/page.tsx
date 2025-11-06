import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Intro } from "@/components/sections/intro"
import { Newsletter } from "@/components/sections/newsletter"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="pt-16 md:pt-16 lg:pt-0">
      <SiteHeader />
      <Hero />
      <Intro />
      <Newsletter />
      <Footer />
    </main>
  )
}
