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

      <button className="text-brand-white hover:text-brand-green transition-colors duration-200 cursor-pointer">
        Home
      </button>
      <button className="text-brand-white hover:text-brand-green transition-colors duration-200 cursor-pointer">
        About Us
      </button>
      <button className="text-brand-white hover:text-brand-green transition-colors duration-200 cursor-pointer">
        Projects
      </button>
      <button className="text-brand-white hover:text-brand-green transition-colors duration-200 cursor-pointer">
        Staff
      </button>
      <button className="text-brand-white hover:text-brand-green transition-colors duration-200 cursor-pointer">
        Contact Us
      </button>

      <div className="ml-auto pr-6 flex gap-4 cursor-pointer">
        <span className="text-white hover:text-[#1877f2] transition-colors duration-200">
          <FaFacebook size={32} color="currentColor" />
        </span>
        <span className="text-white hover:text-[#E1306C] transition-colors duration-200">
          <FaInstagram size={32} color="currentColor" />
        </span>
        <span className="text-white hover:text-[#0A66C2] transition-colors duration-200">
          <FaLinkedin size={32} color="currentColor" />
        </span>
      </div>
    </nav>
  )
}

export default Navbar
