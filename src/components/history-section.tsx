"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const historyEvents = [
  {
    year: "1624",
    event: "Holland telepesek megalapítják Új-Amszterdamot",
    details: "Peter Minuit vezetésével a Holland Nyugat-indiai Társaság megalapította az első állandó európai települést Manhattan déli csücskén.",
    image: "/asd1.jpg"
  },
  {
    year: "1664",
    event: "New York születése",
    details: "Az angolok békésen vették át az irányítást, és a várost New Yorkra keresztelték át York hercege tiszteletére.",
    image: "/sz.jpg"
  },
  {
    year: "1789",
    event: "Az első főváros",
    details: "New York lett az Egyesült Államok első fővárosa, itt iktatták be George Washingtont első elnökként.",
    image: "/4222.jpg"
  },
  {
    year: "1886",
    event: "A Szabadság-szobor felavatása",
    details: "A Franciaország által ajándékozott Szabadság-szobrot október 28-án avatták fel, ami azóta is a szabadság szimbóluma.",
    image: "/asdasd.jpg"
  },
  {
    year: "2024",
    event: "Modern világváros",
    details: "New York ma a világ egyik vezető globális városa, a kultúra, művészet és gazdaság központja.",
    image: "/asdasdasd.jpg"
  }
]

export function HistorySection() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const timeline = timelineRef.current
    const progress = progressRef.current
    const dots = document.querySelectorAll('.timeline-dot')

    if (!timeline || !progress || !dots.length) return

    const updateProgress = () => {
      const rect = timeline.getBoundingClientRect()
      const timelineStart = rect.top
      const timelineEnd = rect.bottom
      const viewportHeight = window.innerHeight

      let progressPercent = 0
      if (timelineStart < viewportHeight && timelineEnd > 0) {
        progressPercent = ((viewportHeight - timelineStart) / (timelineEnd - timelineStart)) * 100
        progressPercent = Math.min(Math.max(progressPercent, 0), 100)
      }

      setScrollProgress(progressPercent)

      // Update active dot
      dots.forEach((dot, index) => {
        const dotRect = dot.getBoundingClientRect()
        if (dotRect.top < viewportHeight * 0.75 && dotRect.bottom > viewportHeight * 0.25) {
          setActiveIndex(index)
        }
      })
    }

    window.addEventListener('scroll', updateProgress)
    updateProgress()

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  useEffect(() => {
    const progress = progressRef.current
    if (!progress) return

    const animateProgress = () => {
      const currentHeight = parseFloat(progress.style.height) || 0
      const diff = scrollProgress - currentHeight
      const newHeight = currentHeight + diff * 0.1

      progress.style.height = `${newHeight}%`

      if (Math.abs(diff) > 0.1) {
        requestAnimationFrame(animateProgress)
      }
    }

    requestAnimationFrame(animateProgress)
  }, [scrollProgress])

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16">
          New York történelme
        </h2>
        <div ref={timelineRef} className="relative">
          {/* Progress Bar */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200">
            <div 
              ref={progressRef} 
              className="absolute top-0 left-0 w-full bg-primary transition-all duration-200"
              style={{ height: '0%' }}
            />
          </div>

          {/* Timeline Events */}
          <div className="space-y-24">
            {historyEvents.map((event, index) => (
              <div key={index} className={cn(
                "relative flex items-center",
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              )}>
                {/* Timeline Dot and Year */}
                <div className={cn(
                  "absolute top-1/2 -translate-y-1/2 flex items-center z-10",
                  index % 2 === 0 ? "left-1/2 -translate-x-1/2" : "right-1/2 translate-x-1/2"
                )}>
                  <div 
                    className={cn(
                      "timeline-dot w-6 h-6 rounded-full transition-all duration-300",
                      activeIndex === index ? "bg-black" : "bg-primary"
                    )}
                  />
                  <span 
                    className={cn(
                      "text-2xl font-bold text-primary whitespace-nowrap absolute top-1/2 -translate-y-1/2 transition-all duration-300",
                      index % 2 === 0 ? "left-10" : "right-10",
                      activeIndex === index ? "text-4xl" : "text-2xl"
                    )}
                    aria-live="polite"
                  >
                    {event.year}
                  </span>
                </div>

                {/* Content Card */}
                <Card className={cn(
                  "w-[calc(50%-60px)] transition-all duration-500 hover:shadow-xl",
                  index % 2 === 0 ? "mr-auto pr-12" : "ml-auto pl-12"
                )}>
                  <CardContent className="p-6">
                    <Image
                      src={event.image}
                      alt={event.event}
                      width={600}
                      height={300}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">{event.event}</h3>
                    <p className="text-gray-600">{event.details}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

