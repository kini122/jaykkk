"use client"

import { useEffect, useRef, useState } from "react"

export function Hero() {
  // slides: single-image slideshow using user-provided uploads
  const slides = [
    { type: "single", src: "https://cdn.builder.io/api/v1/image/assets%2Fc42a4f5004514145a01d1b1dcdf5f9d1%2F317b66d534e242e897933c4b2ac7dee5?format=webp&width=1920", alt: "Hero image 1" },
    { type: "single", src: "https://cdn.builder.io/api/v1/image/assets%2Fc42a4f5004514145a01d1b1dcdf5f9d1%2F67dd430e7094453f801082669f422998?format=webp&width=1920", alt: "Hero image 2" },
    { type: "single", src: "https://cdn.builder.io/api/v1/image/assets%2Fc42a4f5004514145a01d1b1dcdf5f9d1%2F3011b44a7c6d4487b52fc0efc43c975b?format=webp&width=1920", alt: "Hero image 3" },
    { type: "single", src: "https://cdn.builder.io/api/v1/image/assets%2Fc42a4f5004514145a01d1b1dcdf5f9d1%2F4b02dbbe3a1b4c4ab7102518d7937f2c?format=webp&width=1920", alt: "Hero image 4" },
  ]

  // fixed original image dimensions: W: 3840, H: 1860 => ratio H/W
  const ORIGINAL_W = 3840
  const ORIGINAL_H = 1860
  const RATIO = ORIGINAL_H / ORIGINAL_W // 0.484375

  const [heroHeight, setHeroHeight] = useState<number | null>(null)

  const computeHeroHeight = () => {
    if (typeof window === 'undefined') return
    const w = window.innerWidth
    setHeroHeight(Math.round(w * RATIO))
  }

  const [index, setIndex] = useState(0)
  const autoplayDelay = 5500 // ms
  const timeoutRef = useRef<number | null>(null)

  // compute on mount and on resize
  useEffect(() => {
    computeHeroHeight()
    const onResize = () => computeHeroHeight()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    // autoplay timer
    const start = () => {
      clearAutoplay()
      // @ts-ignore - window.setTimeout returns number
      timeoutRef.current = window.setTimeout(() => {
        setIndex((prev) => (prev + 1) % slides.length)
      }, autoplayDelay)
    }

    const clearAutoplay = () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }

    start()
    return () => clearAutoplay()
  }, [index])

  // manual controls
  function prev() {
    setIndex((i) => (i - 1 + slides.length) % slides.length)
  }
  function next() {
    setIndex((i) => (i + 1) % slides.length)
  }
  function goTo(i: number) {
    setIndex(i)
  }

  const isPairActive = slides[index] && slides[index].type === 'pair'

  return (
    <section id="home" className="relative scroll-mt-24 md:scroll-mt-28 max-w-full overflow-x-hidden">
      <div className="hero-aspect w-full max-w-full hero-offset-desktop hero-dynamic" style={heroHeight ? { height: `${heroHeight}px`, marginTop: 'var(--header-h)' } : { marginTop: 'var(--header-h)' }}>
        <div className="hero-inner">
          {/* slides stacked (single-image only) */}
          {slides.map((s, i) => {
            const visibleClass = i === index ? "opacity-100" : "opacity-0 pointer-events-none"

            return (
              <img
                key={`slide-${i}`}
                src={s.src}
                alt={s.alt}
                loading="lazy"
                className={`hero-single-img absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-in-out ${visibleClass}`}
              />
            )
          })}

          {/* overlay text removed per DOM diff */}

        </div>
      </div>
      {/* bottom roles strip moved below hero to avoid overlap */}
      <div className="w-full bg-foreground/80 text-background">
        <div className="mx-auto max-w-7xl px-6">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 py-2 text-xs md:text-sm">
            <li>Creative Director</li>
            <li>Graphic Designer</li>
            <li>Story Teller</li>
            <li>Poet</li>
            <li>Lyricist</li>
            <li>Photographer</li>
            <li>Tablist</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
