"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Color palette -- warm/earthy tones matching gold CI
const COLORS = [
  "rgb(201 169 110)",
  "rgb(180 148 90)",
  "rgb(220 195 150)",
  "rgb(160 130 80)",
  "rgb(190 170 130)",
  "rgb(210 180 120)",
];

const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

// Puzzle piece shown on hover -- fits a 64x32px cell
// Tab nubs stick out on right and bottom, notch cut into left and top
function PuzzleCell() {
  return (
    <svg
      viewBox="0 0 64 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150"
      style={{ overflow: "visible" }}
    >
      {/*
        Puzzle path for a 64x32 cell:
        - Left edge has a notch (indented tab from neighbour)
        - Top edge has a notch
        - Right edge has an outie tab
        - Bottom edge has an outie tab
      */}
      <path
        d="
          M 0 0
          L 20 0
          C 20 0, 22 -5, 27 -5
          C 32 -5, 34 0, 34 0
          L 64 0
          L 64 10
          C 64 10, 69 12, 69 16
          C 69 20, 64 22, 64 22
          L 64 32
          L 44 32
          C 44 32, 42 37, 37 37
          C 32 37, 30 32, 30 32
          L 0 32
          L 0 22
          C 0 22, -5 20, -5 16
          C -5 12, 0 10, 0 10
          Z
        "
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
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
              className="group w-16 h-8 border-r border-t border-gold/20 relative overflow-visible"
              style={{ color: "rgb(201 169 110)" }}
            >
              <PuzzleCell />
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
