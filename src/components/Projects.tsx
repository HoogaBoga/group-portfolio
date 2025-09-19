"use client"

import React, { useState, useEffect, useRef } from "react"

// --- Types ---
interface ProjectInfo {
  title: string
  description: string
  image: string
}

interface ProjectCardProps extends ProjectInfo {
  isVisible: boolean
}

// --- Project Card ---
function ProjectCard({
  title,
  description,
  image,
  isVisible,
}: ProjectCardProps) {
  return (
    <div
      className={`bg-black rounded-xl shadow-lg p-6 mb-4 min-h-[280px] border border-gray-200 hover:shadow-xl transition-all duration-700 ${
        isVisible
          ? "opacity-100 translate-x-0 scale-100"
          : "opacity-0 translate-x-8 scale-95"
      }`}
    >
      <img
        src={image}
        alt={title}
        className={`transition-all duration-500 mb-4 rounded-lg ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      />
      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
        {title}
      </h3>
      <p className="text-white text-sm leading-relaxed line-clamp-4">
        {description}
      </p>
    </div>
  )
}

// --- Carousel Column ---
function CarouselColumn({
  items,
  direction,
  speed = 50,
  onHoverChange,
  columnIndex,
  isVisible,
  hasBeenVisible,
}: {
  items: ProjectInfo[]
  direction: "up" | "down"
  speed?: number
  onHoverChange: (isHovered: boolean) => void
  columnIndex: number
  isVisible: boolean
  hasBeenVisible: boolean
}) {
  const [translateY, setTranslateY] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isManualScrolling, setIsManualScrolling] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const duplicatedItems = [...items, ...items]

  useEffect(() => {
    if (isPaused || isManualScrolling || !isVisible) return

    const interval = setInterval(() => {
      setTranslateY((prev) => {
        const contentHeight = contentRef.current?.scrollHeight || 0
        const itemHeight = contentHeight / 2
        if (direction === "up") {
          const newValue = prev - 1
          return newValue <= -itemHeight ? 0 : newValue
        } else {
          const newValue = prev + 1
          return newValue >= 0 ? -itemHeight : newValue
        }
      })
    }, speed)

    return () => clearInterval(interval)
  }, [isPaused, isManualScrolling, direction, speed, isVisible])

  const handleMouseEnter = () => {
    setIsPaused(true)
    onHoverChange(true)
  }
  const handleMouseLeave = () => {
    setIsPaused(false)
    onHoverChange(false)
    setTimeout(() => setIsManualScrolling(false), 100)
  }
  const handleScroll = (e: React.WheelEvent) => {
    if (!isPaused) return
    e.preventDefault()
    e.stopPropagation()
    setIsManualScrolling(true)

    const contentHeight = contentRef.current?.scrollHeight || 0
    const itemHeight = contentHeight / 2
    const delta = e.deltaY

    setTranslateY((prev) => {
      const newValue = prev - delta * 0.5
      if (newValue <= -itemHeight) return 0
      if (newValue >= 0) return -itemHeight
      return newValue
    })
  }

  return (
    <div
      ref={containerRef}
      className={`h-full overflow-hidden relative cursor-pointer transition-all duration-1000 ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-12 scale-95"
      }`}
      style={{ transitionDelay: `${600 + columnIndex * 200}ms` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onWheel={handleScroll}
    >
      <div
        ref={contentRef}
        className="transition-transform ease-linear"
        style={{
          transform: `translateY(${translateY}px)`,
          transitionDuration: isPaused || isManualScrolling ? "0ms" : "100ms",
        }}
      >
        {duplicatedItems.map((project, index) => (
          <ProjectCard
            key={`${project.title}-${index}`}
            {...project}
            isVisible={isVisible && hasBeenVisible}
          />
        ))}
      </div>

      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
    </div>
  )
}

// --- Main Component ---
function Project() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const projectInfo: ProjectInfo[] = [
    {
      title: "Linya Pub - 2025",
      description:
        "Linya Publication is a student-run organization dedicated to delivering news and stories about iACADEMY's events and activities. Built with Laravel and powered by AWS (EC2, RDS, and S3).",
      image: "/1.png",
    },
    {
      title: "Roam Rome - 2024",
      description:
        "A responsive travel website built using Tailwind CSS and TypeScript that showcases tourist attractions in Rome.",
      image: "/RoamRome.png",
    },
    {
      title: "IDiscount - 2024",
      description:
        "Your go-to app for exclusive student & community discounts you’ll actually love.",
      image: "/idiscount.jpg",
    },
    {
      title: "Zapac - 2025",
      description:
        "ZAPAC is a real-time commuter tracking app designed to make commuting around Cebu faster, safer, and more convenient.",
      image: "/Zapac.png",
    },
    {
      title: "Restaurant Management System - 2023",
      description:
        "A comprehensive Restaurant Management System designed to streamline operations.",
      image: "RMS.jpeg",
    },
    {
      title: "SariSmart - 2025",
      description:
        "An AI-powered inventory management system for sari-sari stores in the Philippines.",
      image: "SariSmart.jpeg",
    },
    {
      title: "The Comeback - 2024",
      description:
        "A rogue-like survival game where players navigate a perilous, ever-changing world.",
      image: "TheComeback.jpeg",
    },
    {
      title: "Lament of the Departed - 2024",
      description:
        "Pixel-crafted maps and emotionally-driven dialogues uncover a tale of loss, memory, and choice.",
      image: "princess_game.png",
    },
  ]

  // Split into carousel columns
  const col1 = projectInfo.filter((_, index) => index % 3 === 0)
  const col2 = projectInfo.filter((_, index) => index % 3 === 1)
  const col3 = projectInfo.filter((_, index) => index % 3 === 2)

  // Intersection Observer for animations
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
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  const featuredProject = projectInfo[0] // Zapac featured

  return (
    <div ref={sectionRef} className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto w-full">
        {/* Title */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-8 scale-95"
          }`}
        >
          <h1 className="font-inter text-center text-[48px] md:text-[64px] font-bold text-white text-stroke-shadow mt-10">
            Our Projects
          </h1>
        </div>

        {/* Featured Project */}
        <div className="relative rounded-2xl overflow-hidden mb-16 shadow-lg">
          <img
            src={featuredProject.image}
            alt={featuredProject.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex items-end p-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {featuredProject.title}
              </h2>
              <p className="text-gray-200 max-w-2xl mb-4">
                {featuredProject.description}
              </p>
              <a
                href="http://ec2-13-236-207-223.ap-southeast-2.compute.amazonaws.com/home"
                target="_blank"
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
              >
                Check it out!
              </a>
            </div>
          </div>
        </div>

        {/* Carousels */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 h-[600px] w-full transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <CarouselColumn
            items={col1}
            direction="up"
            speed={90}
            onHoverChange={() => {}}
            columnIndex={0}
            isVisible={isVisible}
            hasBeenVisible={hasBeenVisible}
          />
          <CarouselColumn
            items={col2}
            direction="down"
            speed={90}
            onHoverChange={() => {}}
            columnIndex={1}
            isVisible={isVisible}
            hasBeenVisible={hasBeenVisible}
          />
          <CarouselColumn
            items={col3}
            direction="up"
            speed={90}
            onHoverChange={() => {}}
            columnIndex={2}
            isVisible={isVisible}
            hasBeenVisible={hasBeenVisible}
          />
        </div>
      </div>
    </div>
  )
}

export default Project
