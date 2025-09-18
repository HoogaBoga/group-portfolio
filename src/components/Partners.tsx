"use client"
import Image from "next/image"
import { useState } from "react"

const PARTNER_LOGOS: string[] = [
  "/partners/CDU.svg",
  "/partners/CTU.svg",
  "/partners/iAcademy Cebu.svg",
  "/partners/NU.svg",
  "/partners/UC.svg",
  "/partners/UP.svg",
  "/partners/USC.svg",
  "/partners/USJR.svg",
  "/partners/UV Gullas.svg",
]

type PartnersProps = {
  title?: string
  className?: string
}

function Lane({
  logos,
  duration = 30,
}: {
  logos: string[]
  duration?: number
}) {
  const [isPaused, setIsPaused] = useState(false)
  // daghan copies para seamless looping
  const sequence = [...logos, ...logos, ...logos]

  return (
    <div
      className="w-full px-4 md:px-6 lg:px-8 relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Left gradient fade */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />
      {/* Right gradient fade */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />

      <div
        className="flex w-max gap-16 animate-scroll-left"
        style={{
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {sequence.map((src, idx) => (
          <div
            key={`${src}-${idx}`}
            className="flex items-center justify-center flex-shrink-0"
          >
            <Image
              src={src}
              alt="Partner logo"
              width={280}
              height={140}
              className="h-28 md:h-32 lg:h-40 w-auto transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Partners({
  title = "Our Partners",
  className = "",
}: PartnersProps) {
  const logos = PARTNER_LOGOS

  return (
    <>
      <style jsx global>{`
        @keyframes scroll-left {
          from {
            transform: translateX(-33.33%);
          }
          to {
            transform: translateX(-66.66%);
          }
        }

        .animate-scroll-left {
          animation-name: scroll-left;
        }
      `}</style>

      <section
        id="partners"
        className={`w-full bg-white flex flex-col items-center justify-center min-h-screen py-16 ${className}`}
      >
        <div className="mx-auto max-w-6xl w-full px-4 md:px-6 lg:px-8">
          <h2 className="font-inter text-center text-[48px] md:text-[64px] font-bold text-white text-stroke-shadow">
            {title}
          </h2>
          <div className="mt-10 relative">
            <Lane logos={logos} duration={35} />
          </div>
          <p className="mt-8 text-center text-sm text-gray-500">
            Hover to pause
          </p>
        </div>
      </section>
    </>
  )
}
