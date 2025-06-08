"use client";
import React, { useState, useEffect } from "react";
import WordAnim from "../animated/WordAnim";
import { useInView } from "react-intersection-observer";
import AnimUp from "../animated/AnimUp";

function ContactHeader() {
  const [ref, inView] = useInView({ triggerOnce: true });
  const [animationsReady, setAnimationsReady] = useState(false);

  // Delay animations until after loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationsReady(true);
    }, 3000); // Wait for loading screen (2.7s) + small buffer

    return () => clearTimeout(timer);
  }, []);

  // Combine inView and animationsReady for proper timing
  const shouldAnimate = inView && animationsReady;

  return (
    <div
      className="flex h-[400px] flex-col items-start justify-between md:flex-row md:items-center"
      ref={ref}
    >
      <div className="md:flex">
        <WordAnim word="GET IN" isAnim={shouldAnimate} />
        <span className="flex md:hidden">
          <WordAnim word="TOUCH" isAnim={shouldAnimate} />
        </span>
        <span className="hidden md:flex">
          <WordAnim word=" TOUCH" isAnim={shouldAnimate} />
        </span>
      </div>
      <AnimUp inView={shouldAnimate} duration={2}>
        <p className="mb-5 font-Antonio text-xl ">{`THANKS FOR YOUR VISIT`}</p>
      </AnimUp>
    </div>
  );
}

export default ContactHeader; 