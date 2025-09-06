import React from "react"
import Carousel from "@/components/Carousel"
import BlurText from "@/components/BlurText"

function Hero() {
  return (
    <section className="grid-cols-1 grid md:grid-cols-2 items-center min-h-[calc(100vh+4rem)] pl-12">
      <div className="flex flex-col justify-center">
        <BlurText
        text="Building Modern Solutions for Modern Problems"
        delay={150}
        animateBy="words"
        direction="top"
        className="font-bold text-6xl mr-20 mb-6"
        />
        {/* <p className="font-bold text-6xl mr-20 mb-6">
          Building Modern Solutions for Modern Problems
        </p> */}
        <p className="font-extralight text-gray-500 text-2xl mr-20 mb-6">
          JSE Software Solutions is about building future-proof software, aiming
          to satisfy your needs.
        </p>

        <div className="flex gap-6">
          <button className="bg-brand-green text-brand-white w-35 h-12 rounded-xl hover:bg-brand-white hover:text-brand-green hover:border transition-all duration-200 cursor-pointer">
            View Our Work
          </button>

          <button className="bg-brand-white text-brand-green w-35 h-12 rounded-xl border hover:bg-brand-green hover:text-brand-white hover:border-brand-green transition-all duration-200 cursor-pointer">
            Contact Us
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-center mr-10 shadow-2xl shadow-gray-500 rounded-xl border-b-6 border-r-6 border-brand-green">
          <Carousel />
        </div>
      </div>
    </section>
  )
}

export default Hero
