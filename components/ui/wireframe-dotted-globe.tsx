"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
  dotColor?: string
  oceanColor?: string
  strokeColor?: string
}

export default function RotatingEarth({
  width = 800,
  height = 600,
  className = "",
  dotColor = "#C9A96E",
  oceanColor = "transparent",
  strokeColor = "#C9A96E",
}: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    const containerWidth = Math.min(width, window.innerWidth - 40)
    const containerHeight = Math.min(height, window.innerHeight - 100)
    const radius = Math.min(containerWidth, containerHeight) / 2.2

    const dpr = window.devicePixelRatio || 1
    canvas.width = containerWidth * dpr
    canvas.height = containerHeight * dpr
    canvas.style.width = `${containerWidth}px`
    canvas.style.height = `${containerHeight}px`
    context.scale(dpr, dpr)

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(context)

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside
        }
      }
      return inside
    }

    const pointInFeature = (point: [number, number], feature: GeoJSON.Feature): boolean => {
      const geometry = feature.geometry as GeoJSON.Polygon | GeoJSON.MultiPolygon
      if (geometry.type === "Polygon") {
        if (!pointInPolygon(point, geometry.coordinates[0] as number[][])) return false
        for (let i = 1; i < geometry.coordinates.length; i++) {
          if (pointInPolygon(point, geometry.coordinates[i] as number[][])) return false
        }
        return true
      } else if (geometry.type === "MultiPolygon") {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0] as number[][])) {
            let inHole = false
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i] as number[][])) { inHole = true; break }
            }
            if (!inHole) return true
          }
        }
        return false
      }
      return false
    }

    const generateDotsInPolygon = (feature: GeoJSON.Feature, dotSpacing = 16) => {
      const dots: [number, number][] = []
      const bounds = d3.geoBounds(feature as d3.ExtendedFeature)
      const [[minLng, minLat], [maxLng, maxLat]] = bounds
      const stepSize = dotSpacing * 0.08
      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          if (pointInFeature([lng, lat], feature)) dots.push([lng, lat])
        }
      }
      return dots
    }

    interface DotData { lng: number; lat: number }
    const allDots: DotData[] = []
    let landFeatures: GeoJSON.FeatureCollection | null = null

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight)
      const currentScale = projection.scale()
      const scaleFactor = currentScale / radius

      // Globe background — transparent so page bg shows
      context.beginPath()
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
      if (oceanColor !== "transparent") {
        context.fillStyle = oceanColor
        context.fill()
      }
      context.strokeStyle = strokeColor
      context.lineWidth = 1 * scaleFactor
      context.globalAlpha = 0.3
      context.stroke()
      context.globalAlpha = 1

      if (landFeatures) {
        // Graticule lines
        const graticule = d3.geoGraticule()
        context.beginPath()
        path(graticule())
        context.strokeStyle = strokeColor
        context.lineWidth = 0.5 * scaleFactor
        context.globalAlpha = 0.12
        context.stroke()
        context.globalAlpha = 1

        // Land outlines
        context.beginPath()
        landFeatures.features.forEach((feature) => path(feature as d3.GeoPermissibleObjects))
        context.strokeStyle = strokeColor
        context.lineWidth = 0.8 * scaleFactor
        context.globalAlpha = 0.5
        context.stroke()
        context.globalAlpha = 1

        // Land dots
        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat])
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= containerWidth &&
            projected[1] >= 0 &&
            projected[1] <= containerHeight
          ) {
            context.beginPath()
            context.arc(projected[0], projected[1], 1.5 * scaleFactor, 0, 2 * Math.PI)
            context.fillStyle = dotColor
            context.globalAlpha = 0.75
            context.fill()
            context.globalAlpha = 1
          }
        })
      }
    }

    const rotation: [number, number, number] = [0, -20, 0]
    let autoRotate = true
    // Smoothly interpolated tilt values driven by cursor
    let targetTiltY = -20
    let targetTiltZ = 0
    let currentTiltY = -20
    let currentTiltZ = 0

    const rotationTimer = d3.timer(() => {
      if (autoRotate) {
        rotation[0] += 0.18
        // Lerp tilt toward cursor target for buttery smoothness
        currentTiltY += (targetTiltY - currentTiltY) * 0.06
        currentTiltZ += (targetTiltZ - currentTiltZ) * 0.06
        projection.rotate([rotation[0], currentTiltY, currentTiltZ])
        render()
      }
    })

    // Listen on the whole window so any cursor movement drives the globe
    const handleWindowMouseMove = (event: MouseEvent) => {
      if (!autoRotate) return
      // Normalise cursor to -1…1 relative to the viewport
      const nx = (event.clientX / window.innerWidth) * 2 - 1
      const ny = (event.clientY / window.innerHeight) * 2 - 1
      targetTiltY = -20 + ny * 20   // tilt up/down ±20°
      targetTiltZ = nx * 8          // roll left/right ±8°
    }

    const handleMouseDown = (event: MouseEvent) => {
      // Only respond to clicks on the canvas itself
      if (event.target !== canvas) return
      autoRotate = false
      const startX = event.clientX
      const startY = event.clientY
      const startRotation: [number, number, number] = [...rotation]

      const handleMMove = (e: MouseEvent) => {
        const sensitivity = 0.4
        rotation[0] = startRotation[0] + (e.clientX - startX) * sensitivity
        rotation[1] = Math.max(-90, Math.min(90, startRotation[1] - (e.clientY - startY) * sensitivity))
        projection.rotate(rotation)
        render()
      }

      const handleMUp = () => {
        document.removeEventListener("mousemove", handleMMove)
        document.removeEventListener("mouseup", handleMUp)
        setTimeout(() => { autoRotate = true }, 100)
      }

      document.addEventListener("mousemove", handleMMove)
      document.addEventListener("mouseup", handleMUp)
    }

    window.addEventListener("mousemove", handleWindowMouseMove)
    canvas.addEventListener("mousedown", handleMouseDown)

    const loadWorldData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json"
        )
        if (!response.ok) throw new Error("Failed to load")
        landFeatures = await response.json()
        landFeatures!.features.forEach((feature) => {
          generateDotsInPolygon(feature, 16).forEach(([lng, lat]) => allDots.push({ lng, lat }))
        })
        render()
        setIsLoading(false)
      } catch {
        setError("Fehler beim Laden der Karte")
        setIsLoading(false)
      }
    }

    loadWorldData()

    return () => {
      rotationTimer.stop()
      window.removeEventListener("mousemove", handleWindowMouseMove)
      canvas.removeEventListener("mousedown", handleMouseDown)
    }
  }, [width, height, dotColor, oceanColor, strokeColor])

  if (error) return null

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`w-full h-auto transition-opacity duration-700 ${isLoading ? "opacity-0" : "opacity-100"} cursor-grab active:cursor-grabbing`}
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  )
}
