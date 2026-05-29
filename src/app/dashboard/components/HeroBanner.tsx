"use client"

import { useState, useEffect, useRef } from "react"

const BANNER_SLIDES = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80",
    alt: "Summer Sale",
    title: "Summer Sale — Up to 60% Off",
    subtitle: "Shop the latest trends in electronics, clothing, and more",
    ctaLabel: "Shop Now",
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
    alt: "New Arrivals",
    title: "New Arrivals Every Day",
    subtitle: "Discover fresh styles and exclusive collections",
    ctaLabel: "Explore",
  },
  {
    id: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
    alt: "Free Shipping",
    title: "Free Shipping on Orders $50+",
    subtitle: "Fast delivery right to your doorstep",
    ctaLabel: "Learn More",
  },
]

const AUTOPLAY_INTERVAL = 5000

export function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLElement>(null)

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % BANNER_SLIDES.length)
  }

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length
    )
  }

  useEffect(() => {
    if (isPaused) return

    const intervalId = setInterval(() => {
      handleNext()
    }, AUTOPLAY_INTERVAL)

    return () => clearInterval(intervalId)
  }, [isPaused])

  const currentSlide = BANNER_SLIDES[activeIndex]

  return (
    <section
      ref={containerRef}
      className="relative w-full aspect-[16/6] overflow-hidden rounded-xl group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {BANNER_SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === activeIndex
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <img
            src={slide.imageUrl}
            alt={slide.alt}
            className="object-cover w-full h-full"
          />
        </div>
      ))}

      <div
        className="absolute inset-0 z-20 flex flex-col justify-end p-8"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)",
        }}
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          {currentSlide.title}
        </h1>
        <p className="text-lg text-white/80 mb-6">{currentSlide.subtitle}</p>
        <button
          className="w-fit bg-white text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => console.log("CTA clicked:", currentSlide.ctaLabel)}
        >
          {currentSlide.ctaLabel}
        </button>
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-4 z-30 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        &#8249;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 z-30 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        &#8250;
      </button>

      <div className="absolute bottom-4 z-30 flex gap-2" style={{ left: "50%", transform: "translateX(-50%)" }}>
        {BANNER_SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setActiveIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === activeIndex
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
