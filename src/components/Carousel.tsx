"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"

const images = ["/1.png"]

function Carousel() {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-[700px] h-[390px]">
      {/* Green shadow only on bottom and right */}
      <div className="absolute inset-0 border-b-[8px] border-r-[8px] border-brand-green translate-x-2 translate-y-2 rounded-xl -z-10"></div>
      
      {/* Main card with black border only on bottom and right */}
      <div className="relative w-full h-full overflow-hidden border-b-[8px] border-r-[8px] border-brand-black bg-white rounded-xl">
        {/* Slides wrapper */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, index) => (
            <div key={index} className="w-full h-[390px] relative flex-shrink-0">
              <Image
                src={src}
                alt={`Slide ${index}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 z-10"
        >
          <IoIosArrowBack size={24} />
        </button>
        
        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 z-10"
        >
          <IoIosArrowForward size={24} />
        </button>
      </div>
    </div>
  )
}

export default Carousel
