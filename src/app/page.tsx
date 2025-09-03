import Image from "next/image"
import Hero from "@/components/Hero"

export default function Home() {
  return (
    <div className="bg-brand-white">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Hero />
      </main>
    </div>
  )
}
