"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"

const images = ["/1.png", "/6.png", "/8.png"]

function Carousel() {
  const hasMultiple = images.length > 1

  // For seamless infinite loop: use clones at both ends
  const extendedImages = hasMultiple
    ? [images[images.length - 1], ...images, images[0]]
    : images

  // Start at 1 (the first real slide) when we have clones; else 0
  const [index, setIndex] = useState(hasMultiple ? 1 : 0)
  const [isAnimating, setIsAnimating] = useState(true)

  const nextSlide = () => {
    if (!hasMultiple) return
    setIndex((prev) => prev + 1)
  }

  const prevSlide = () => {
    if (!hasMultiple) return
    setIndex((prev) => prev - 1)
  }

  // Auto-advance to the right only
  useEffect(() => {
    if (!hasMultiple) return
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1)
    }, 3000)
    return () => clearInterval(interval)
  }, [hasMultiple])

  // After crossing a clone, jump without animation to the matching real slide
  const handleTransitionEnd = () => {
    if (!hasMultiple) return
    if (index === extendedImages.length - 1) {
      // Moved onto trailing clone (first image clone)
      setIsAnimating(false)
      setIndex(1)
    } else if (index === 0) {
      // Moved onto leading clone (last image clone)
      setIsAnimating(false)
      setIndex(images.length)
    }
  }

  // Re-enable animation on the next frame after a jump
  useEffect(() => {
    if (!isAnimating) {
      const id = requestAnimationFrame(() => setIsAnimating(true))
      return () => cancelAnimationFrame(id)
    }
  }, [isAnimating])

  // Ensure we initialize correctly if image count changes
  useEffect(() => {
    if (hasMultiple) {
      setIndex(1)
    } else {
      setIndex(0)
    }
  }, [hasMultiple])

  return (
    <div className="relative w-[700px] h-[390px]">
      {/* Green shadow only on bottom and right */}
      <div className="absolute inset-0 border-b-[8px] border-r-[8px] border-brand-green translate-x-2 translate-y-2 rounded-xl -z-10"></div>
      
      {/* Main card with black border only on bottom and right */}
      <div className="relative w-full h-full overflow-hidden border-b-[8px] border-r-[8px] border-brand-black bg-white rounded-xl">
        {/* Slides wrapper */}
        <div
          className={
            "flex ease-in-out" + (isAnimating ? " transition-transform duration-700" : "")
          }
          style={{ transform: `translateX(-${index * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedImages.map((src, i) => (
            <div key={i} className="w-full h-[390px] relative flex-shrink-0">
              <Image
                src={src}
                alt={`Slide ${i}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 z-10 disabled:opacity-50"
          disabled={!hasMultiple}
        >
          <IoIosArrowBack size={24} />
        </button>
        
        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 z-10 disabled:opacity-50"
          disabled={!hasMultiple}
        >
          <IoIosArrowForward size={24} />
        </button>
      </div>
    </div>
  )
}

export default Carousel
