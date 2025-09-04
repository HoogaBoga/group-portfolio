"use client"
import { useState, ChangeEvent, FormEvent, JSX } from "react"

interface FormData {
  name: string
  email: string
  message: string
}

export default function ContactForm(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    //do form submission either butang gforms or something
    console.log("Form submitted:", formData)
  }

  return (
    <div className="inline-block w-auto max-w-none bg-white border border-black rounded-[20px] p-6">
      <h2 className="font-inter font-bold text-[28px] md:text-[32px] leading-[1.2] text-black mb-6">
        Send us a message
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="name"
          className="box-border w-fill h-[60px] bg-white border border-black rounded-[20px] px-[24px] py-[18px] font-inter font-thin text-[18px] md:text-[20px] leading-[24px] text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email"
          className="box-border w-fill h-[60px] bg-white border border-black rounded-[20px] px-[24px] py-[18px] font-inter font-thin text-[18px] md:text-[20px] leading-[24px] text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="message"
          rows={8}
          className="box-border w-fill md:w-[620px] lg:w-[800px] max-w-none bg-white border border-black rounded-[20px] px-[24px] py-[18px] font-inter font-thin text-[18px] md:text-[20px] leading-[24px] text-black placeholder-black resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          className="w-[187px] h-[60px] bg-green-600 hover:bg-green-700 transition-colors duration-200 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[20px] flex flex-row justify-center items-center px-[24px] py-[32px] gap-[10px]"
        >
          <span className="font-inter font-semibold text-[20px] md:text-[24px] leading-[29px] text-white">
            Send
          </span>
        </button>
      </form>
    </div>
  )
}
