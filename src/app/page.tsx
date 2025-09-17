import Image from "next/image"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Staff from "@/components/Staff"
import Contact from "@/components/Contact"
import Project from "@/components/Projects"
import ScrollReveal from "@/components/ScrollReveal"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="bg-brand-white overflow-x-hidden">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start overflow-x-hidden">
        <section id="hero">
          <ScrollReveal>
            <Hero />
          </ScrollReveal>
        </section>
        <section
          id="projects"
          className="w-full flex justify-center items-center p-6 max-h-full"
        >
          <Project />
        </section>
        <section id="about">
          <ScrollReveal offset={200}>
            <About />
          </ScrollReveal>
        </section>

        <Staff />
        <section
          id="contact"
          className="w-full flex justify-center items-center"
        >
          <ScrollReveal offset={200}>
            <Contact />
          </ScrollReveal>
        </section>
      </main>
    </div>
  )
}
