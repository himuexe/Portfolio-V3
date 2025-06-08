"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CursorProps {
  className?: string;
  name?: string;
}

function Cursor({
  className,
  name = "HOVER ME",
}: CursorProps) {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });

      // Simple hover detection
      const target = e.target as HTMLElement;
      setIsHovered(
        !!(target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('group'))
      );
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <motion.div
      className={`pointer-events-none fixed left-0 top-0 z-50 h-[50px] w-[50px] cursor-none rounded-full border border-white ${className} mix-blend-difference`}
      animate={{
        x: mousePosition.x - 25,
        y: mousePosition.y - 25,
        scale: isHovered ? 1.2 : 1,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 400,
        mass: 0.5,
      }}
    >
      {isHovered && (
        <h3 className="fixed w-[150px] translate-x-14 translate-y-2 font-Antonio font-bold text-sm whitespace-nowrap">
          {name}
        </h3>
      )}
    </motion.div>
  );
}

export default Cursor; 