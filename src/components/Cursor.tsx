"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Cursor({
  className,
  name = "HOVER ME",
}: {
  className?: string;
  name?: string;
}) {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 25,
      y: mousePosition.y - 25,
    },
  };
  
  return (
    <motion.div
      className={`pointer-events-none fixed left-0 top-0 z-50 h-[50px] w-[50px] cursor-none rounded-full border border-white ${className} mix-blend-difference`}
      variants={variants}
      animate={"default"}
    >
      <h3 className="fixed w-[150px] translate-x-14 translate-y-2 font-Antonio font-bold">
        {name}
      </h3>
    </motion.div>
  );
}

export default Cursor; 