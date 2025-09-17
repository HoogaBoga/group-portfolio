"use client"

import React, { useState, useEffect, useRef } from "react"

interface EmployeeCardProps {
  name: string
  role: string
  description: string
  image: string
  mainColor: string
  altColor: string
  index: number
  isVisible: boolean
}

interface StaffMember {
  name: string
  role: string
  description: string
  image: string
  mainColor: string
  altColor: string
}

function EmployeeCard({
  name,
  role,
  description,
  image,
  mainColor,
  altColor,
  index,
  isVisible,
}: EmployeeCardProps) {
  const cardColorMap: Record<string, string> = {
    black: "bg-black text-white",
    white: "bg-white text-black",
    gray: "bg-gray-100 text-gray-900",
    "brand-green": "bg-green-500 text-black",
  }

  const buttonColorMap: Record<string, string> = {
    black: "bg-black text-green-500",
    white: "bg-white text-black",
    gray: "bg-green-500 text-gray-100",
    "brand-green": "bg-green-500 text-gray-900",
  }

  const bgClass = cardColorMap[mainColor]?.split(" ")[0] || "bg-white"
  const textClass = cardColorMap[mainColor]?.split(" ")[1] || "text-black"

  const buttonBgClass = buttonColorMap[altColor]?.split(" ")[0] || "bg-gray-800"
  const buttonTextClass =
    buttonColorMap[altColor]?.split(" ")[1] || "text-white"

  const borderClass = buttonBgClass

  return (
    <div
      className={`${bgClass} ${textClass} rounded-xl shadow-md p-8 min-w-80 min-h-96 max-w-80 flex-shrink-0 transition-all duration-700 hover:shadow-2xl hover:scale-110 hover:-translate-y-2 cursor-pointer transform-gpu hover:z-10 relative ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-16 scale-95"
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
        animationDelay: `${index * 150}ms`,
      }}
    >
      <div className={"flex justify-center mb-4"}>
        <img
          src={
            image ||
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
          }
          alt={name}
          className={`w-32 h-32 rounded-full object-cover border-4 shadow-md ${borderClass} transition-transform duration-500 hover:scale-110`}
        />
      </div>
      <h3 className="text-2xl font-bold mb-2 text-center transition-colors duration-300">
        {name}
      </h3>
      <p className="text-lg font-semibold mb-3 opacity-90 text-center transition-opacity duration-300 hover:opacity-100">
        {role}
      </p>
      <p className="text-center mb-6 text-sm leading-relaxed transition-all duration-300">
        {description}
      </p>
      <div className="flex justify-center">
        <a
          className={`${buttonBgClass} ${buttonTextClass} py-2 px-4 rounded-md font-medium text-base transition-all duration-300 hover:scale-105 hover:shadow-lg`}
          href="https://princess-mikaela-portfolio.vercel.app/"
        >
          Portfolio
        </a>
      </div>
    </div>
  )
}

function Staff() {
  const staffMembers: StaffMember[] = [
    {
      name: "Lim, Matthew Spyke",
      role: "CEO & Frontend Engineer",
      description:
        "As both our CEO and Frontend Engineer, they lead the vision of the company while bringing ideas to life through intuitive user interfaces. Balancing leadership with hands-on development, they make sure the team moves forward with clarity and innovation.",
      image: "/Spyke.jpeg",
      mainColor: "black",
      altColor: "white",
    },
    {
      name: "Cotejar, Edwell John",
      role: "Backend Engineer",
      description:
        "Focused on building the backbone of our applications, our Backend Engineer ensures reliable, secure, and efficient systems. They specialize in designing robust APIs, managing databases, and optimizing performance to keep everything running smoothly behind the scenes.",
      image: "/Edwell.jpeg",
      mainColor: "gray",
      altColor: "brand-green",
    },
    {
      name: "Tagalog, Judd",
      role: "Full-Stack Engineer",
      description:
        "Our Fullstack Engineer bridges the gap between frontend and backend, creating seamless experiences from design to deployment. Skilled in multiple technologies, they adapt to any challenge and ensure that every project is delivered with both functionality and polish.",
      image: "/Judd.jpeg",
      mainColor: "brand-green",
      altColor: "black",
    },
    {
      name: "Borbajo, Princess Mikaela",
      role: "UI/UX Designer",
      description:
        "Create user-centered digital products by designing both the User Interface (UI), or the visual elements users interact with, and the overall User Experience (UX), or how easy and enjoyable it is to use the product.",
      image: "/Princess.png",
      mainColor: "black",
      altColor: "white",
    },
    {
      name: "Estorba, Zoie Christie",
      role: "UI/UX Designer",
      description:
        "Create user-centered digital products by designing both the User Interface (UI), or the visual elements users interact with, and the overall User Experience (UX), or how easy and enjoyable it is to use the product.",
      image: "/Zoie.png",
      mainColor: "gray",
      altColor: "brand-green",
    },
  ]

  const [scrollPosition, setScrollPosition] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const cardWidth = 320 + 32 // card width + gap
  const totalWidth = staffMembers.length * cardWidth

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            setHasBeenVisible(true)
          } else {
            setIsVisible(false)
          }
        })
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: "-50px 0px -50px 0px", // Add some margin for better trigger timing
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Continuous auto-scroll functionality
  useEffect(() => {
    if (isHovered || !isVisible) return // Pause auto-scroll when hovering or not visible

    const interval = setInterval(() => {
      setScrollPosition((prevPosition) => {
        const newPosition = prevPosition + 1
        // Seamless loop - no reset transition needed
        return newPosition >= totalWidth
          ? newPosition - totalWidth
          : newPosition
      })
    }, 30) // Smooth continuous scroll

    return () => clearInterval(interval)
  }, [totalWidth, isHovered, isVisible])

  return (
    <section
      ref={sectionRef}
      id="staff"
      className="py-16 bg-white w-full flex flex-col items-center justify-center min-h-[calc(100vh+4rem)] mt-10 transition-all duration-1000"
    >
      <h1
        ref={titleRef}
        className={`font-inter font-bold text-[64px] underline text-brand-white text-center text-stroke-shadow mb-2 transition-all duration-1000 ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-8 scale-95"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        Meet the crew
      </h1>

      <div
        className={`w-full overflow-hidden transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "400ms" }}
      >
        <div
          className="relative py-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Cards container with continuous scroll */}
          <div
            className="flex gap-8 transition-transform duration-300"
            style={{
              transform: `translateX(-${scrollPosition}px)`,
            }}
          >
            {/* Render cards twice for seamless infinite loop */}
            {[...staffMembers, ...staffMembers].map((member, index) => (
              <EmployeeCard
                key={`${member.name}-${index}`}
                {...member}
                index={index % staffMembers.length}
                isVisible={isVisible && hasBeenVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Staff
