import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="w-full bg-brand-black text-gray-300 py-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-6 px-4">
        
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/JSE Logo_black 1.svg" alt="JSE Logo" className="h-30 w-auto" />
        </div>

        {/* Nav Links */}
        <div className="flex flex-wrap justify-center gap-8 text-sm">
          <a href="#hero" className="hover:text-white transition">Home</a>
          <a href="#about" className="hover:text-white transition">About Us</a>
          <a href="#projects" className="hover:text-white transition">Projects</a>
          <a href="#staff" className="hover:text-white transition">Staff</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 text-xl">
          <a href="#" className="hover:text-white transition"><FaFacebookF /></a>
          <a href="#" className="hover:text-white transition"><FaInstagram /></a>
          <a href="#" className="hover:text-white transition"><FaLinkedin /></a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-400">
          Made with ❤️ by JSE Software Solutions
        </div>
      </div>
    </footer>
  );
}
