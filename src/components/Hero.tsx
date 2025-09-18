import React from "react"
import Carousel from "@/components/Carousel"
import BlurText from "@/components/BlurText"

function Hero() {
  return (
    <div className="relative min-h-[calc(100vh)]">
      <section className="grid-cols-1 grid md:grid-cols-2 items-center min-h-[calc(100vh+4rem)] pl-12 relative z-10">
        <div className="flex flex-col justify-center">
          <div className="font-bold text-6xl mr-20 mb-6">
            <BlurText
              text="Building"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-black inline-block mr-4"
            />
            <BlurText
              text="Modern"
              delay={300}
              animateBy="words"
              direction="top"
              className="text-brand-green inline-block mr-4"
            />
            <BlurText
              text="Solutions"
              delay={450}
              animateBy="words"
              direction="top"
              className="text-brand-green inline-block mr-4"
            />
            <BlurText
              text="for"
              delay={600}
              animateBy="words"
              direction="top"
              className="text-black inline-block mr-4"
            />
            <BlurText
              text="Modern"
              delay={750}
              animateBy="words"
              direction="top"
              className="text-brand-green inline-block mr-4"
            />
            <BlurText
              text="Problems"
              delay={900}
              animateBy="words"
              direction="top"
              className="text-brand-green inline-block"
            />
          </div>
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
      
      {/* Green triangle accent from right edge to bottom left */}
      <div 
        className="absolute bottom-0 right-0 w-screen h-[40vh] bg-brand-green opacity-90 z-0"
        style={{
          clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%)'
        }}
      ></div>
    </div>
  )
}

export default Hero
