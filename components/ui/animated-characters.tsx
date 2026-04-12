"use client";

import { useState, useEffect, useRef } from "react";

/* ─── Pupil (no white sclera) ──────────────────────────────────────────────── */
interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  forceLookX?: number;
  forceLookY?: number;
}

function Pupil({ size = 12, maxDistance = 5, pupilColor = "#1e1a16", forceLookX, forceLookY }: PupilProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const pos = (() => {
    if (forceLookX !== undefined && forceLookY !== undefined) return { x: forceLookX, y: forceLookY };
    if (!ref.current) return { x: 0, y: 0 };
    const r = ref.current.getBoundingClientRect();
    const dx = mouse.x - (r.left + r.width / 2);
    const dy = mouse.y - (r.top + r.height / 2);
    const dist = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance);
    const angle = Math.atan2(dy, dx);
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
  })();

  return (
    <div
      ref={ref}
      className="rounded-full"
      style={{
        width: size, height: size,
        backgroundColor: pupilColor,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: "transform 0.1s ease-out",
      }}
    />
  );
}

/* ─── EyeBall (with white sclera) ──────────────────────────────────────────── */
interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
  forceLookX?: number;
  forceLookY?: number;
}

function EyeBall({
  size = 48, pupilSize = 16, maxDistance = 10,
  eyeColor = "white", pupilColor = "#1e1a16",
  isBlinking = false, forceLookX, forceLookY,
}: EyeBallProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const pos = (() => {
    if (forceLookX !== undefined && forceLookY !== undefined) return { x: forceLookX, y: forceLookY };
    if (!ref.current) return { x: 0, y: 0 };
    const r = ref.current.getBoundingClientRect();
    const dx = mouse.x - (r.left + r.width / 2);
    const dy = mouse.y - (r.top + r.height / 2);
    const dist = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance);
    const angle = Math.atan2(dy, dx);
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
  })();

  return (
    <div
      ref={ref}
      className="rounded-full flex items-center justify-center transition-all duration-150"
      style={{
        width: size, height: isBlinking ? 2 : size,
        backgroundColor: eyeColor, overflow: "hidden",
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full"
          style={{
            width: pupilSize, height: pupilSize,
            backgroundColor: pupilColor,
            transform: `translate(${pos.x}px, ${pos.y}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      )}
    </div>
  );
}

/* ─── Random blink hook ─────────────────────────────────────────────────────── */
function useBlink() {
  const [blinking, setBlinking] = useState(false);
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timeout = setTimeout(() => {
        setBlinking(true);
        setTimeout(() => { setBlinking(false); schedule(); }, 150);
      }, Math.random() * 4000 + 3000);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, []);
  return blinking;
}

/* ─── Main export ───────────────────────────────────────────────────────────── */
export function AnimatedCharacters() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef  = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);

  const purpleBlinking = useBlink();
  const blackBlinking  = useBlink();

  useEffect(() => {
    const handle = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const calcPos = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 3;
    const dx = mouse.x - cx;
    const dy = mouse.y - cy;
    return {
      faceX:    Math.max(-15, Math.min(15, dx / 20)),
      faceY:    Math.max(-10, Math.min(10, dy / 30)),
      bodySkew: Math.max(-6,  Math.min(6, -dx / 120)),
    };
  };

  const pp = calcPos(purpleRef);
  const bp = calcPos(blackRef);
  const yp = calcPos(yellowRef);
  const op = calcPos(orangeRef);

  return (
    <div className="relative flex items-end justify-center" style={{ width: 460, height: 340 }}>

      {/* Purple — tall, back layer */}
      <div
        ref={purpleRef}
        className="absolute bottom-0 transition-transform duration-700 ease-in-out"
        style={{
          left: 55, width: 150, height: 330,
          backgroundColor: "#6C3FF5",
          borderRadius: "10px 10px 0 0",
          zIndex: 1,
          transform: `skewX(${pp.bodySkew}deg)`,
          transformOrigin: "bottom center",
        }}
      >
        <div
          className="absolute flex gap-6 transition-all duration-200 ease-out"
          style={{ left: 38 + pp.faceX, top: 32 + pp.faceY }}
        >
          <EyeBall size={16} pupilSize={6} maxDistance={4} isBlinking={purpleBlinking} />
          <EyeBall size={16} pupilSize={6} maxDistance={4} isBlinking={purpleBlinking} />
        </div>
      </div>

      {/* Black — medium, middle layer */}
      <div
        ref={blackRef}
        className="absolute bottom-0 transition-transform duration-700 ease-in-out"
        style={{
          left: 195, width: 100, height: 255,
          backgroundColor: "#2D2D2D",
          borderRadius: "8px 8px 0 0",
          zIndex: 2,
          transform: `skewX(${bp.bodySkew}deg)`,
          transformOrigin: "bottom center",
        }}
      >
        <div
          className="absolute flex gap-5 transition-all duration-200 ease-out"
          style={{ left: 22 + bp.faceX, top: 26 + bp.faceY }}
        >
          <EyeBall size={14} pupilSize={5} maxDistance={4} isBlinking={blackBlinking} />
          <EyeBall size={14} pupilSize={5} maxDistance={4} isBlinking={blackBlinking} />
        </div>
      </div>

      {/* Orange — semicircle, front left */}
      <div
        ref={orangeRef}
        className="absolute bottom-0 transition-transform duration-700 ease-in-out"
        style={{
          left: 0, width: 200, height: 165,
          backgroundColor: "#FF9B6B",
          borderRadius: "100px 100px 0 0",
          zIndex: 3,
          transform: `skewX(${op.bodySkew}deg)`,
          transformOrigin: "bottom center",
        }}
      >
        <div
          className="absolute flex gap-7 transition-all duration-200 ease-out"
          style={{ left: 68 + op.faceX, top: 72 + op.faceY }}
        >
          <Pupil size={11} maxDistance={4} />
          <Pupil size={11} maxDistance={4} />
        </div>
      </div>

      {/* Yellow — rounded rect, front right */}
      <div
        ref={yellowRef}
        className="absolute bottom-0 transition-transform duration-700 ease-in-out"
        style={{
          left: 258, width: 120, height: 190,
          backgroundColor: "#E8D754",
          borderRadius: "60px 60px 0 0",
          zIndex: 4,
          transform: `skewX(${yp.bodySkew}deg)`,
          transformOrigin: "bottom center",
        }}
      >
        <div
          className="absolute flex gap-5 transition-all duration-200 ease-out"
          style={{ left: 42 + yp.faceX, top: 34 + yp.faceY }}
        >
          <Pupil size={11} maxDistance={4} />
          <Pupil size={11} maxDistance={4} />
        </div>
        {/* Mouth */}
        <div
          className="absolute h-[3px] w-16 bg-[#1e1a16] rounded-full transition-all duration-200 ease-out"
          style={{ left: 32 + yp.faceX, top: 72 + yp.faceY }}
        />
      </div>

    </div>
  );
}
