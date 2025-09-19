import Hero from "@/components/Hero"
import About from "@/components/About"
import Contact from "@/components/Contact"
import Project from "@/components/Projects"
import ScrollReveal from "@/components/ScrollReveal"
import Partners from "@/components/Partners"

export default function Home() {
  return (
    <div className="bg-brand-white overflow-x-hidden">
      <main className="flex flex-col overflow-x-hidden">
        {/* Hero Section - First section accounts for navbar */}
        <section id="home" className="min-h-screen pt-20">
          <ScrollReveal>
            <Hero />
          </ScrollReveal>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="min-h-screen w-full flex justify-center items-center p-6"
        >
          <Project />
        </section>

        {/* Partners Section */}
        <section
          id="partners"
          className="min-h-screen w-full flex justify-center items-center"
        >
          <Partners title="Our Partners" />
        </section>

        {/* About Section */}
        <section
          id="about"
          className="min-h-screen w-full flex justify-center items-center"
        >
          <ScrollReveal offset={200}>
            <About />
          </ScrollReveal>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen w-full flex justify-center items-center"
        >
          <ScrollReveal offset={200}>
            <Contact />
          </ScrollReveal>
        </section>
      </main>
    </div>
  )
}
