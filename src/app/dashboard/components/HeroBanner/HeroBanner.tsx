"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { BANNER_SLIDES, AUTOPLAY_INTERVAL } from "./const"

export function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % BANNER_SLIDES.length)
  }, [])

  const handlePrev = useCallback(() => {
    setActiveIndex(
      (prev) =>
        (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length
    )
  }, [])

  const handleGoToSlide = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  useEffect(() => {
    if (isPaused) return

    const intervalId = setInterval(handleNext, AUTOPLAY_INTERVAL)
    return () => clearInterval(intervalId)
  }, [isPaused, handleNext])

  const currentSlide = BANNER_SLIDES[activeIndex]

  return (
    <section
      className="relative w-full aspect-16/6 overflow-hidden rounded-xl group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Promotional banners"
    >
      {BANNER_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === activeIndex
              ? "opacity-100 z-10"
              : "opacity-0 z-0"
          }`}
          aria-roledescription="slide"
          aria-label={`Slide ${index + 1} of ${BANNER_SLIDES.length}`}
          aria-hidden={index !== activeIndex}
        >
          <Image
            src={slide.imageUrl}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1400px"
            className="object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 z-20 bg-linear-to-b from-transparent to-black/70 flex flex-col justify-end p-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          {currentSlide.title}
        </h1>
        <p className="text-lg text-white/80 mb-6">
          {currentSlide.subtitle}
        </p>
        <button
          className="w-fit bg-white text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={currentSlide.ctaLabel}
        >
          {currentSlide.ctaLabel}
        </button>
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
        aria-label="Next slide"
      >
        ›
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {BANNER_SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => handleGoToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === activeIndex
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  )
}
