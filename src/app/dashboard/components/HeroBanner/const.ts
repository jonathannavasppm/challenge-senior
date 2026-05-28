import type { BannerSlide } from "./types"

export const BANNER_SLIDES: BannerSlide[] = [
  {
    id: "summer-sale",
    imageUrl:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80",
    alt: "Summer sale promotional banner — up to 60% off on electronics and clothing",
    title: "Summer Sale — Up to 60% Off",
    subtitle:
      "Shop the latest trends in electronics, clothing, and more",
    ctaLabel: "Shop Now",
  },
  {
    id: "new-arrivals",
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80",
    alt: "New arrivals collection banner featuring latest products",
    title: "New Arrivals Just Dropped",
    subtitle:
      "Discover our freshest picks across all categories",
    ctaLabel: "Explore",
  },
  {
    id: "free-shipping",
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80",
    alt: "Free shipping promotion banner for orders over fifty dollars",
    title: "Free Shipping on Orders $50+",
    subtitle:
      "No minimum hassle — fast delivery straight to your door",
    ctaLabel: "Learn More",
  },
]

export const AUTOPLAY_INTERVAL = 5000
