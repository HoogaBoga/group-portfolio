"use client"

import React, { useState, useEffect, useRef } from "react"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  isVisible: boolean
}

interface ProjectInfo {
  title: string
  description: string
  image: string
}

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
        className={`transition-all duration-500 ${
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

interface CarouselColumnProps {
  items: ProjectInfo[]
  direction: "up" | "down"
  speed?: number
  onHoverChange: (isHovered: boolean) => void
  columnIndex: number
  isVisible: boolean
  hasBeenVisible: boolean
}

function CarouselColumn({
  items,
  direction,
  speed = 50,
  onHoverChange,
  columnIndex,
  isVisible,
  hasBeenVisible,
}: CarouselColumnProps) {
  const [translateY, setTranslateY] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isManualScrolling, setIsManualScrolling] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Duplicate items for seamless scrolling
  const duplicatedItems = [...items, ...items]

  useEffect(() => {
    if (isPaused || isManualScrolling || !isVisible) return

    const interval = setInterval(() => {
      setTranslateY((prev) => {
        const contentHeight = contentRef.current?.scrollHeight || 0
        const containerHeight = containerRef.current?.clientHeight || 0
        const itemHeight = contentHeight / 2 // Since we duplicated items

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
      style={{
        transitionDelay: `${600 + columnIndex * 200}ms`,
      }}
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

      {/* Gradient overlays for seamless effect */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-50 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none z-10" />
    </div>
  )
}

function Project() {
  const [isCarouselHovered, setIsCarouselHovered] = useState(false)
  const [hoveredColumns, setHoveredColumns] = useState(new Set<number>())
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const projectInfo: ProjectInfo[] = [
    {
      title: "Linya Pub - 2025",
      description:
        "Linya Publication is a student-run organization dedicated to delivering news and stories about iACADEMY's events and activities. Built with Laravel and powered by AWS (EC2, RDS, and S3), Linya provides students with a reliable and accessible platform for campus updates.",
      image: "/1.png",
    },
    {
      title: "Roam Rome - 2024",
      description:
        "A responsive travel website built using Tailwind CSS and TypeScript that showcases tourist attractions in Rome. The site features an elegant design with interactive elements, allowing users to explore famous landmarks, historical sites, and local experiences in the Eternal City.",
      image: "",
    },
    {
      title: "IDiscount - 2024",
      description:
        "Task-Management-System is a web application built with Laravel, TailwindCSS, and Supabase. It is designed for managing your own tasks efficiently, providing a clean interface and robust backend for personal productivity.",
      image: "/idiscount.jpg",
    },
    {
      title: "Zapac - 2025",
      description:
        "ZAPAC is a real-time commuter tracking app designed to make commuting around Cebu faster, safer, and more convenient. It helps users view nearby jeepney and bus routes, track vehicle locations, and save favorites — all in one seamless mobile experience.",
      image: "/Zapac.png",
    },
    {
      title: "MindSpace - 2023",
      description:
        "A mental wellness application that combines meditation, mood tracking, and community support. Developed using Flutter and Firebase, providing cross-platform accessibility for mental health resources.",
      image: "",
    },
    {
      title: "MindSpace - 2023",
      description:
        "A mental wellness application that combines meditation, mood tracking, and community support. Developed using Flutter and Firebase, providing cross-platform accessibility for mental health resources.",
      image: "",
    },
    {
      title: "Lament of the Departed - 2024",
      description:
        "Lament of the Departed follows the mysterious journey of a lone character navigating a broken world filled with haunting echoes of the past. Through pixel-crafted maps and emotionally-driven dialogues, players uncover a tale of loss, memory, and choice.",
      image: "princess_game.png",
    },
  ]

  const column1 = projectInfo.filter((_, index) => index % 3 === 0)
  const column2 = projectInfo.filter((_, index) => index % 3 === 1)
  const column3 = projectInfo.filter((_, index) => index % 3 === 2)

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

  const handleColumnHover = (columnIndex: number, isHovered: boolean) => {
    setHoveredColumns((prev) => {
      const newSet = new Set(prev)
      if (isHovered) {
        newSet.add(columnIndex)
      } else {
        newSet.delete(columnIndex)
      }
      return newSet
    })

    setIsCarouselHovered(isHovered || hoveredColumns.size > 0)
  }

  // Lock/unlock body scroll based on carousel hover state
  useEffect(() => {
    const body = document.body
    const shouldLock = hoveredColumns.size > 0

    if (shouldLock) {
      // Only lock if not already locked
      if (!body.hasAttribute("data-scroll-locked")) {
        // Calculate scrollbar width to prevent layout shift
        const scrollbarWidth =
          window.innerWidth - document.documentElement.clientWidth

        // Store the current scroll position before locking
        const scrollY = window.scrollY

        // Apply lock styles using overflow hidden instead of position fixed
        body.style.overflow = "hidden"
        body.style.paddingRight = `${scrollbarWidth}px`
        body.style.height = "100vh"

        // Mark as locked and store scroll position
        body.setAttribute("data-scroll-locked", "true")
        body.setAttribute("data-scroll-y", scrollY.toString())
      }
    } else {
      // Only unlock if currently locked
      if (body.hasAttribute("data-scroll-locked")) {
        // Clear all lock styles
        body.style.overflow = ""
        body.style.paddingRight = ""
        body.style.height = ""
        body.removeAttribute("data-scroll-locked")
        body.removeAttribute("data-scroll-y")
      }
    }

    return () => {
      // Cleanup on unmount - only if locked
      if (body.hasAttribute("data-scroll-locked")) {
        body.style.overflow = ""
        body.style.paddingRight = ""
        body.style.height = ""
        body.removeAttribute("data-scroll-locked")
        body.removeAttribute("data-scroll-y")
      }
    }
  }, [hoveredColumns.size])

  return (
    <div
      ref={sectionRef}
      className="min-h-[calc(100vh+4rem)] py-12 px-4 transition-all duration-1000 mt-5"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-8 scale-95"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <h1 className="font-inter font-bold text-[64px] underline text-brand-white text-center text-stroke-shadow">
            Our Projects
          </h1>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 h-[600px] w-full transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <CarouselColumn
            items={column1}
            direction="up"
            speed={90}
            onHoverChange={(isHovered) => handleColumnHover(0, isHovered)}
            columnIndex={0}
            isVisible={isVisible}
            hasBeenVisible={hasBeenVisible}
          />

          <CarouselColumn
            items={column2}
            direction="down"
            speed={90}
            onHoverChange={(isHovered) => handleColumnHover(1, isHovered)}
            columnIndex={1}
            isVisible={isVisible}
            hasBeenVisible={hasBeenVisible}
          />

          <CarouselColumn
            items={column3}
            direction="up"
            speed={90}
            onHoverChange={(isHovered) => handleColumnHover(2, isHovered)}
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
