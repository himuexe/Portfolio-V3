"use client";
import React from "react";
import WordAnim from "../animated/WordAnim";
import { useInView } from "react-intersection-observer";
import AnimUp from "../animated/AnimUp";

function ContactHeader() {
  const [ref, inView] = useInView({ triggerOnce: true });
  return (
    <div
      className="flex h-[400px] flex-col items-start justify-between md:flex-row md:items-center"
      ref={ref}
    >
      <div className="md:flex">
        <WordAnim word="GET IN" isAnim={inView} />
        <span className="flex md:hidden">
          <WordAnim word="TOUCH" isAnim={inView} />
        </span>
        <span className="hidden md:flex">
          <WordAnim word=" TOUCH" isAnim={inView} />
        </span>
      </div>
      <AnimUp inView={inView} duration={2}>
        <p className="mb-5 font-Antonio text-xl ">{`THANKS FOR YOUR VISIT`}</p>
      </AnimUp>
    </div>
  );
}

export default ContactHeader; 