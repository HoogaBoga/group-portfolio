import Image from "next/image"
import Hero from "@/components/Hero"
import About from "@/components/About"

export default function Home() {
  return (
    <div className="bg-brand-white">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <section id="hero">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>
      </main>
    </div>
  )
}
