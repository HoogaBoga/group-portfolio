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
    </section>
  )
}

export default About
