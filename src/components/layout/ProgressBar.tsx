"use client";
import { useScroll, useSpring, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useIsLoaderFromStore } from "@/store/isLoader.slice";

function ProgressBar() {
  const { isLoader } = useIsLoaderFromStore();
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (isLoader.active) {
      // Sync with loading counter
      let progressCounter = 0;
      const interval = setInterval(() => {
        progressCounter++;
        setProgress(progressCounter / 100);
        if (progressCounter >= 100) {
          clearInterval(interval);
        }
      }, 12);
      
      return () => clearInterval(interval);
    }
  }, [isLoader.active]);

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[100] h-[2px] bg-white"
      style={{ 
        scaleX: isLoader.active ? progress : scaleX, 
        transformOrigin: "0%" 
      }}
    />
  );
}

export default ProgressBar; 