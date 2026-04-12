"use client";

import { motion } from "framer-motion";

interface HandWrittenCircleProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

function HandWrittenCircle({
  children,
  className = "",
  color = "#C9A96E",
}: HandWrittenCircleProps) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: [0.43, 0.13, 0.23, 0.96] },
        opacity: { duration: 0.3 },
      },
    },
  };

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Animated circle SVG */}
      <motion.svg
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
      >
        <motion.ellipse
          cx="50"
          cy="52"
          rx="56"
          ry="34"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          variants={draw}
          style={{ rotate: "-3deg" }}
        />
      </motion.svg>

      {/* Text */}
      <motion.span
        className="relative z-10"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export { HandWrittenCircle };
