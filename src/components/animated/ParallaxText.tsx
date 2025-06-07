"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);

  const [windowSize, setWindowSize] = useState({
    width: 0,
  });

  const useScrollY = useScroll({
    offset: ["start end", "end start"],
  });
  const scrollYProgress = useSpring(useScrollY.scrollYProgress, {
    damping: 100,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const x = useTransform(
    baseX,
    (v) => `${wrap(-windowSize.width / 100, -40, v) * scrollYProgress.get()}%`
  );

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    const moveBy = directionFactor.current * baseVelocity * (delta / 12000);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="m-0 flex w-full flex-nowrap overflow-hidden whitespace-nowrap font-humane text-[12rem] sm:text-[16rem] md:text-[20rem] uppercase leading-[0.8] opacity-10">
      <motion.div className="hidden flex-nowrap pt-2 lg:flex" style={{ x: x }}>
        <span className="mr-10">{children} </span>
        <span className="mr-10">{children} </span>
        <span className="mr-10">{children} </span>
        <span className="mr-10">{children} </span>
      </motion.div>
      <div className="flex-nowrap pt-2 lg:hidden">
        <span className="mr-10">{children} </span>
      </div>
    </div>
  );
}

export default ParallaxText; 