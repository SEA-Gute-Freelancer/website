"use client"

import * as React from "react"
import { useRef } from "react"
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"
import Link from "next/link"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const cn = (...args: Parameters<typeof clsx>) => twMerge(clsx(args))

export interface DockItemData {
  label: string
  href: string
  icon?: React.ReactNode
  active?: boolean
}

export interface AnimatedDockProps {
  items: DockItemData[]
  className?: string
}

export function AnimatedDock({ items, className }: AnimatedDockProps) {
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.nav
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "flex h-12 items-center gap-1 rounded-full px-2",
        className
      )}
    >
      {items.map((item) => (
        <DockItem key={item.href} mouseX={mouseX} item={item} />
      ))}
    </motion.nav>
  )
}

interface DockItemProps {
  mouseX: MotionValue<number>
  item: DockItemData
}

function DockItem({ mouseX, item }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  // Width of the pill expands on proximity
  const widthSync = useTransform(distance, [-140, 0, 140], [1, 1.22, 1])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 180, damping: 14 })

  // Text slightly scales up too
  const scaleSync = useTransform(distance, [-140, 0, 140], [1, 1.12, 1])
  const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 180, damping: 14 })

  // Background brightens on proximity
  const bgOpacity = useTransform(distance, [-120, 0, 120], [0, 1, 0])
  const bgOpacitySpring = useSpring(bgOpacity, { mass: 0.1, stiffness: 200, damping: 16 })

  return (
    <motion.div ref={ref} style={{ scaleX: width, scaleY: width }} className="origin-center">
      <Link
        href={item.href}
        className="relative flex items-center gap-2 px-4 py-2 rounded-full group"
      >
        {/* Hover background */}
        <motion.span
          style={{ opacity: bgOpacitySpring }}
          className="absolute inset-0 rounded-full bg-gold/12 border border-gold/25"
          aria-hidden
        />

        {/* Icon */}
        {item.icon && (
          <motion.span
            style={{ scale }}
            className={cn(
              "relative shrink-0 transition-colors duration-200",
              item.active ? "text-gold" : "text-warm-muted group-hover:text-gold"
            )}
          >
            {item.icon}
          </motion.span>
        )}

        {/* Label */}
        <motion.span
          style={{ scale }}
          className={cn(
            "relative text-[13.5px] font-medium tracking-wide whitespace-nowrap transition-colors duration-200",
            item.active ? "text-gold" : "text-warm-muted group-hover:text-charcoal"
          )}
        >
          {item.label}
        </motion.span>

        {/* Active dot */}
        {item.active && (
          <motion.span
            layoutId="dock-active"
            className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold"
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        )}
      </Link>
    </motion.div>
  )
}
