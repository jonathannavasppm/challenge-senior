import Image from "next/image"

const BANNER_IMAGE_URL =
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80"

export function HeroBanner() {
  return (
    <div className="relative w-full aspect-16/6 overflow-hidden rounded-xl">
      <Image
        src={BANNER_IMAGE_URL}
        alt="Summer sale promotional banner — up to 60% off on electronics and clothing"
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1400px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/70 flex flex-col justify-end p-8">
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
