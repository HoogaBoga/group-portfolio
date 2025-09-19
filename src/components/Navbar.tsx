"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"

const sections = ["home", "projects", "partners", "about", "contact"]

function Navbar() {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i])
        if (section) {
          const top = section.offsetTop
          const bottom = top + section.offsetHeight

          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className="bg-brand-black w-full pl-6 flex gap-8 items-center fixed z-40">
      <Image
        src="/JSE Logo_black 1.svg"
        width={120}
        height={120}
        alt="JSE Logo"
      />

      {sections.map((section) => (
        <a
          key={section}
          href={`#${section}`}
          className={`cursor-pointer transition-colors duration-200 ${
            activeSection === section
              ? "text-brand-green font-bold"
              : "text-brand-white hover:text-brand-green"
          }`}
        >
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </a>
      ))}
    </nav>
  )
}

export default Navbar
