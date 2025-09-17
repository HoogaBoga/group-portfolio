import React from "react"
import Image from "next/image"
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"

function Navbar() {
  return (
    <nav className="bg-brand-black w-full pl-6 flex gap-8 items-center fixed z-40">
      <Image
        src="/JSE Logo_black 1.svg"
        width={120}
        height={120}
        alt="JSE Logo"
      ></Image>

      <a
        href="#hero"
        className="text-brand-white hover:text-brand-green transition-colors duration-200 cursor-pointer"
      >
        Home
      </a>
      <a
        href="#projects"
        className="text-brand-white hover:text-brand-green transition-colors duration-200 cursor-pointer"
      >
        Projects
      </a>
      <a
        href="#partners"
        className="text-brand-white hover:text-brand-green transition-colors duration-200 cursor-pointer"
      >
        Partners
      </a>
      <a
        href="#about"
        className="text-brand-white hover:text-brand-green transition-colors duration-200 cursor-pointer"
      >
        About Us
      </a>

      <a
        href="#contact"
        className="text-brand-white hover:text-brand-green transition-colors duration-200 cursor-pointer"
      >
        Contact Us
      </a>
    </nav>
  )
}

export default Navbar
