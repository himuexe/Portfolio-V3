"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ScrollProgressProps {
  className?: string;
  strokeWidth?: number;
  color?: string;
  size?: number;
}

function ScrollProgress({
  className = "",
  strokeWidth = 2,
  color = "#ffffff",
  size = 60,
}: ScrollProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div
      ref={ref}
      className={`fixed right-8 top-1/2 z-40 -translate-y-1/2 ${className}`}
      style={{ opacity }}
    >
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          opacity={0.2}
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: useTransform(
              pathLength,
              [0, 1],
              [circumference, 0]
            ),
          }}
        />
      </svg>
      
      {/* Center dot */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          backgroundColor: color,
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]),
        }}
      />
    </motion.div>
  );
}

export default ScrollProgress; 