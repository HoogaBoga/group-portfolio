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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      //mailto 
      const subject = encodeURIComponent(`Message from ${formData.name}`)
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )
      window.location.href = `mailto:matty.lim718@gmail.com?subject=${subject}&body=${body}`
      
      setSubmitStatus('success')
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-[1500px] bg-white border border-black rounded-[20px] p-6 border-b-6 border-r-6">
      <h2 className="font-inter font-bold text-[28px] md:text-[32px] leading-[1.2] text-black mb-6">
        Send us a message
      </h2>

      {submitStatus === 'success' && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          Message sent successfully! We'll get back to you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          There was an error sending your message. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="name"
          required
          className="w-full h-[60px] bg-white border border-black rounded-[20px] px-[24px] py-[18px] font-inter font-thin text-[18px] md:text-[20px] leading-[24px] text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email"
          required
          className="w-full h-[60px] bg-white border border-black rounded-[20px] px-[24px] py-[18px] font-inter font-thin text-[18px] md:text-[20px] leading-[24px] text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="message"
          rows={6}
          required
          className="w-full bg-white border border-black rounded-[20px] px-[24px] py-[18px] font-inter font-thin text-[18px] md:text-[20px] leading-[24px] text-black placeholder-black resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-[187px] h-[60px] bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[20px] flex flex-row justify-center items-center px-[24px] py-[32px] gap-[10px]"
        >
          <span className="font-inter font-semibold text-[20px] md:text-[24px] leading-[29px] text-white">
            {isSubmitting ? 'Sending...' : 'Send'}
          </span>
        </button>
      </form>
    </div>
  )
}
