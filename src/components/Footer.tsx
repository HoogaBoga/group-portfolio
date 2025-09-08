import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0c1633] text-gray-300 py-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-6 px-4">
        
        {/* Nav Links */}
        <div className="flex flex-wrap justify-center gap-8 text-sm">
          <a href="#" className="hover:text-white transition">Home</a>
          <a href="#" className="hover:text-white transition">Experience</a>
          <a href="#" className="hover:text-white transition">News</a>
          <a href="#" className="hover:text-white transition">About us</a>
          <a href="#" className="hover:text-white transition">Jobs</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 text-xl">
          <a href="#" className="hover:text-white transition"><FaFacebookF /></a>
          <a href="#" className="hover:text-white transition"><FaTwitter /></a>
          <a href="#" className="hover:text-white transition"><FaYoutube /></a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-400">
          © Copyright {new Date().getFullYear()} - Lift Media
        </div>
      </div>
    </footer>
  );
}
