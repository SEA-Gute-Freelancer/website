"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Color palette -- warm/earthy tones to complement the gold CI
const COLORS = [
  "rgb(201 169 110)",  // gold
  "rgb(180 148 90)",   // gold-dark
  "rgb(220 195 150)",  // gold-light
  "rgb(245 235 220)",  // cream
  "rgb(160 130 80)",   // amber
  "rgb(190 170 130)",  // sand
  "rgb(210 180 120)",  // wheat
  "rgb(240 220 180)",  // linen
];

const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  // Reduced counts for performance while still covering the skewed viewport
  const rows = new Array(60).fill(1);
  const cols = new Array(30).fill(1);

  return (
    <div
      style={{
        transform:
          "translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)",
      }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={"row" + i}
          className="w-16 h-8 border-l border-gold/20 relative"
        >
          {cols.map((_, j) => (
            <motion.div
              key={"col" + j}
              whileHover={{
                backgroundColor: getRandomColor(),
                transition: { duration: 0 },
              }}
              animate={{ transition: { duration: 2 } }}
              className="w-16 h-8 border-r border-t border-gold/20 relative"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute h-6 w-10 -top-[14px] -left-[22px] text-gold/25 stroke-[1px] pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
