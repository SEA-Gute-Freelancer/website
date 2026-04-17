"use client"

import React, { useCallback, useMemo, useRef } from "react"
import { v4 as uuidv4 } from "uuid"
import { cn } from "@/lib/utils"
import { useDimensions } from "@/components/hooks/use-debounced-dimensions"

interface PixelTrailProps {
  pixelSize: number
  fadeDuration?: number
  delay?: number
  className?: string
  pixelClassName?: string
  id?: string
}

const PixelTrail: React.FC<PixelTrailProps> = ({
  pixelSize = 20,
  fadeDuration = 500,
  delay = 0,
  className,
  pixelClassName,
  id,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const dimensions = useDimensions(containerRef)
  const trailId = useRef(id ?? uuidv4())

  const columns = useMemo(() => Math.ceil(dimensions.width / pixelSize), [dimensions.width, pixelSize])
  const rows = useMemo(() => Math.ceil(dimensions.height / pixelSize), [dimensions.height, pixelSize])

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
    >
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <PixelDot
              key={`${colIndex}-${rowIndex}`}
              id={`${trailId.current}-pixel-${colIndex}-${rowIndex}`}
              size={pixelSize}
              fadeDuration={fadeDuration}
              delay={delay}
              className={pixelClassName}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

interface PixelDotProps {
  id: string
  size: number
  fadeDuration: number
  delay: number
  className?: string
}

const PixelDot: React.FC<PixelDotProps> = React.memo(({ id, size, fadeDuration, delay, className }) => {
  const dotRef = useRef<HTMLDivElement>(null)

  const animatePixel = useCallback(() => {
    const el = dotRef.current
    if (!el) return
    el.style.transition = "none"
    el.style.opacity = "1"
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = `opacity ${fadeDuration}ms ease ${delay}ms`
        el.style.opacity = "0"
      })
    })
  }, [fadeDuration, delay])

  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      (dotRef as React.MutableRefObject<HTMLDivElement | null>).current = node
      if (node) (node as any).__animatePixel = animatePixel
    },
    [animatePixel]
  )

  return (
    <div
      id={id}
      ref={setRef}
      className={cn(className)}
      style={{ width: `${size}px`, height: `${size}px`, opacity: 0 }}
    />
  )
})

PixelDot.displayName = "PixelDot"
export { PixelTrail }
