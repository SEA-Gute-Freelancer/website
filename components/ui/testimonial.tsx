"use client"

import * as React from "react"
import { motion, PanInfo } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Star, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react"

export interface Testimonial {
  id: number | string
  name: string
  company: string
  location: string
  avatar: string
  description: string
  result: string
}

interface TestimonialCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[]
}

const TestimonialCarousel = React.forwardRef<HTMLDivElement, TestimonialCarouselProps>(
  ({ className, testimonials, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [exitX, setExitX] = React.useState(0)
    const [isDragging, setIsDragging] = React.useState(false)

    const advance = React.useCallback((dir: "next" | "prev") => {
      const offset = dir === "next" ? -300 : 300
      setExitX(offset)
      setTimeout(() => {
        setCurrentIndex((prev) =>
          dir === "next"
            ? (prev + 1) % testimonials.length
            : (prev - 1 + testimonials.length) % testimonials.length
        )
        setExitX(0)
      }, 220)
    }, [testimonials.length])

    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsDragging(false)
      if (Math.abs(info.offset.x) > 80) {
        advance(info.offset.x < 0 ? "next" : "prev")
      }
    }

    return (
      <div ref={ref} className={cn("relative flex flex-col items-center", className)} {...props}>
        {/* Card stack */}
        <div className="relative w-full max-w-lg h-[340px] sm:h-[320px]">
          {testimonials.map((t, index) => {
            const isTop    = index === currentIndex
            const isMid    = index === (currentIndex + 1) % testimonials.length
            const isBottom = index === (currentIndex + 2) % testimonials.length
            if (!isTop && !isMid && !isBottom) return null

            return (
              <motion.div
                key={t.id}
                className={cn(
                  "absolute inset-x-0 rounded-3xl overflow-hidden",
                  "bg-white border border-gold/15",
                  isTop ? "cursor-grab active:cursor-grabbing shadow-2xl shadow-charcoal/12" : "pointer-events-none"
                )}
                style={{ zIndex: isTop ? 30 : isMid ? 20 : 10 }}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.65}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={isTop ? handleDragEnd : undefined}
                animate={{
                  scale:   isTop ? 1 : isMid ? 0.95 : 0.90,
                  opacity: isTop ? 1 : isMid ? 0.55 : 0.25,
                  y:       isTop ? 0 : isMid ? 14 : 26,
                  x:       isTop ? exitX : 0,
                  rotate:  isTop ? exitX / 22 : isMid ? -1.5 : -3,
                }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
              >
                <div className="p-7 sm:p-8 flex flex-col gap-5">
                  {/* Top row: stars + result */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={13} className="text-gold fill-gold" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 border border-gold/25 rounded-full text-gold text-xs font-semibold">
                      <TrendingUp size={10} />
                      {t.result}
                    </span>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-warm-muted text-[15px] leading-relaxed line-clamp-4">
                    „{t.description}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gold/10">
                    <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0 ring-2 ring-gold/20">
                      <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="40px" />
                    </div>
                    <div>
                      <p className="text-charcoal text-sm font-semibold">{t.name}</p>
                      <p className="text-warm-muted text-xs">{t.company} · {t.location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 mt-10">
          <button
            onClick={() => advance("prev")}
            className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-charcoal transition-all duration-200"
            aria-label="Vorherige"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === currentIndex
                    ? "w-5 h-2 bg-gold"
                    : "w-2 h-2 bg-gold/25 hover:bg-gold/50"
                )}
                aria-label={`Karte ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => advance("next")}
            className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-charcoal transition-all duration-200"
            aria-label="Nächste"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Drag hint */}
        <p className="mt-4 text-warm-muted-light text-xs tracking-wide">
          Ziehen oder Pfeile zum Blättern
        </p>
      </div>
    )
  }
)
TestimonialCarousel.displayName = "TestimonialCarousel"

export { TestimonialCarousel }
