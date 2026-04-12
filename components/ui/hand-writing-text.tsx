"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface HandWrittenCircleProps {
  children: ReactNode;
  className?: string;
  color?: string;
}

function HandWrittenCircle({
  children,
  className = "",
  color = "#C9A96E",
}: HandWrittenCircleProps) {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number] },
        opacity: { duration: 0.3 },
      },
    },
  };

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Animated hand-drawn circle */}
      <motion.svg
        className="absolute pointer-events-none"
        style={{
          top: "-18%",
          left: "-8%",
          width: "116%",
          height: "136%",
          overflow: "visible",
        }}
        viewBox="0 0 200 80"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
      >
        <motion.path
          d="M 185 20
             C 195 5, 180 -5, 150 -3
             C 110 -6, 60 -8, 25 5
             C -5 18, -5 40, 5 55
             C 20 72, 60 82, 100 82
             C 145 82, 190 72, 198 55
             C 206 38, 195 20, 185 20"
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={draw}
        />
      </motion.svg>

      {/* Text */}
      <motion.span
        className="relative z-10"
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export { HandWrittenCircle };
