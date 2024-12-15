import Image from 'next/image'
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
      <Image
        src="/asdasd.jpg"
        alt="New York City skyline"
        layout="fill"
        objectFit="cover"
        priority
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
          Fedezze fel New York varázsát
        </h1>
        <p className="text-xl sm:text-2xl text-white mb-8 max-w-3xl">
          Merüljön el a város lenyűgöző látványosságaiban, ízletes éttermeiben és vibráló kultúrájában.
        </p>
        <Button size="lg" className="text-lg px-8 py-4">
          Fedezze fel most
        </Button>
      </div>
    </div>
  )
}

