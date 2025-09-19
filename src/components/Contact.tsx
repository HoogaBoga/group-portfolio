import React from "react"
import { MdOutlineEmail } from "react-icons/md"
import { FaPhoneAlt } from "react-icons/fa"
import ContactForm from "./ContactForm"

interface ContactInfoProps {
  email?: string
  phone?: string
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  email = "matty.lim718@gmail.com",
  phone = "+09177734483",
}) => {
  return (
    <div className="flex flex-col justify-center">
      <h2 className="w-full font-inter whitespace-nowrap font-bold text-[28px] md:text-[32px] leading-[1.2] text-black">
        Contact Information
      </h2>
      <div className="mt-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-red-500 rounded-[20px] flex items-center justify-center shadow-md">
          <MdOutlineEmail size={24} color="white" />
        </div>
        <div className="flex flex-col">
          <span className="font-inter font-semibold text-lg text-gray-800">
            Email
          </span>
          <span className="font-inter text-gray-700 break-all">{email}</span>
        </div>
      </div>
      <div className="mt-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-500 rounded-[20px] flex items-center justify-center shadow-md">
          <FaPhoneAlt size={24} color="white" />
        </div>
        <div className="flex flex-col">
          <span className="font-inter font-semibold text-lg text-gray-800">
            Phone
          </span>
          <span className="font-inter text-gray-700">{phone}</span>
        </div>
      </div>
    </div>
  )
}

const Contact: React.FC = () => {
  return (
    <section id="contact" className="w-full bg-brand-white min-h-screen mt-10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="font-inter font-bold text-[48px] md:text-[64px] underline text-brand-white text-center text-stroke-shadow">
          Get in touch
        </h1>
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-12 lg:gap-16 items-start mt-8">
          <div className="lg:col-span-2 w-full">
            <ContactInfo />
          </div>
          <div className="lg:col-span-5 w-full">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
