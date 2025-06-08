"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'rotate' | 'blur';
  offset?: [string, string];
  duration?: number;
  delay?: number;
}

function ScrollReveal({
  children,
  className = "",
  variant = 'fadeUp',
  offset = ["start 0.9", "start 0.1"],
  duration = 0.6,
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  // Create all possible transforms at component level
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const yDefault = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const xLeft = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const xRight = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 0]);
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(10px)", "blur(0px)"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Select the appropriate animation props based on variant
  const getAnimationProps = () => {
    switch (variant) {
      case 'fadeUp':
        return { y, opacity };
      case 'fadeLeft':
        return { x: xLeft, opacity };
      case 'fadeRight':
        return { x: xRight, opacity };
      case 'scale':
        return { scale, opacity };
      case 'rotate':
        return { rotate, opacity };
      case 'blur':
        return { filter, opacity };
      default:
        return { y: yDefault, opacity };
    }
  };

  const animationProps = getAnimationProps();

  return (
    <motion.div
      ref={ref}
      className={className}
      style={animationProps}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal; 