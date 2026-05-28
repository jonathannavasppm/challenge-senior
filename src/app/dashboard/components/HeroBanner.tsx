"use client"

import { useState, useEffect, useRef } from "react"

const BANNER_IMAGE_URL =
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=4000&q=100"

export function HeroBanner() {
  const [imageWidth, setImageWidth] = useState(0)
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (bannerRef.current) {
        const { width } = bannerRef.current.getBoundingClientRect()
        setImageWidth(width)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div ref={bannerRef} className="relative w-full overflow-hidden rounded-xl">
      <img
        src={BANNER_IMAGE_URL}
        alt="banner"
        style={{ height: "500px", width: imageWidth || "100%" }}
        className="object-cover w-full"
      />
      <div
        className="absolute inset-0 flex flex-col justify-end p-8"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)",
        }}
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          Summer Sale — Up to 60% Off
        </h1>
        <p className="text-lg text-white/80 mb-6">
          Shop the latest trends in electronics, clothing, and more
        </p>
        <button className="w-fit bg-white text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
          Shop Now
        </button>
      </div>
    </div>
  )
}
