import React from "react"
import Image from "next/image"

function About() {
  return (
    <section className="grid-cols-1 grid md:grid-cols-2 items-center min-h-screen pl-12">
      <div className="grid grid-cols-3 gap-4 w-full mt-20">
        <div className="relative h-[600px] w-[200px]">
          <Image
            src="/Edwell.jpeg"
            alt="Edwell"
            fill
            className="object-cover rounded-xl"
          />
        </div>
        <div className="relative h-[600px] w-[200px]">
          <Image
            src="/Spyke.jpeg"
            alt="Spyke"
            fill
            className="object-cover rounded-xl"
          />
        </div>
        <div className="relative h-[600px] w-[200px]">
          <Image
            src="/Judd.jpeg"
            alt="Judd"
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <p className="font-bold text-6xl mr-20 mb-6">About Us</p>
        <p className="font-extralight text-gray-500 text-2xl mr-20 mb-6">
          At{" "}
          <span className="text-brand-green font-bold">
            JSE Software Solutions
          </span>
          , we create smart, reliable, and scalable software tailored to help
          businesses grow. Our focus is on building solutions that streamline
          operations, boost productivity, and adapt to future needs.
        </p>
        <p className="font-extralight text-gray-500 text-2xl mr-20 mb-6">
          We go <span className="text-brand-green font-bold">beyond</span>{" "}
          coding—we deliver software that empowers businesses to succeed in the
          digital age.
        </p>

        <button className="bg-brand-white text-brand-green w-35 h-12 rounded-xl border hover:bg-brand-green hover:text-brand-white hover:border-brand-green transition-all duration-200 cursor-pointer">
          Learn More
        </button>
      </div>
    </section>
  )
}

export default About
