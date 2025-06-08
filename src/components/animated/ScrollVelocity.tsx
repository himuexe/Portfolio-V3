"use client";
import React, { useRef } from "react";
import { motion, useScroll, useVelocity, useTransform } from "framer-motion";

interface ScrollVelocityProps {
  children: React.ReactNode;
  className?: string;
  factor?: number;
  maxVelocity?: number;
}

function ScrollVelocity({
  children,
  className = "",
  factor = 0.5,
  maxVelocity = 100,
}: ScrollVelocityProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Smooth velocity tracking
  const smoothVelocity = useTransform(
    scrollVelocity,
    [-maxVelocity, 0, maxVelocity],
    [-factor, 0, factor]
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        skewY: smoothVelocity,
        scale: useTransform(
          smoothVelocity,
          [-factor, 0, factor],
          [0.98, 1, 0.98]
        ),
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 300,
      }}
    >
      {children}
    </motion.div>
  );
}

export default ScrollVelocity; 