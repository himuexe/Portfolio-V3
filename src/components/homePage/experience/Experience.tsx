"use client";
import React from "react";
import ParallaxText from "@/components/animated/ParallaxText";
import AnimUp from "@/components/animated/AnimUp";
import { useInView } from "react-intersection-observer";
import LayoutSection from "@/components/layout/LayoutSection";
import Line from "@/components/layout/Line";

function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0,
  });

  return (
    <LayoutSection className="flex flex-col items-end justify-center">
      <div
        ref={ref}
        className="absolute left-1/2 top-1/2 flex h-screen w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden"
      >
        <div>
          <ParallaxText baseVelocity={-5}>
            USER EXPERIENCE TECHNOLOGIES PERFORMANCE
          </ParallaxText>
          <ParallaxText baseVelocity={5}>
            USER EXPERIENCE TECHNOLOGIES PERFORMANCE
          </ParallaxText>
        </div>
      </div>
      <div className="w-10/12 font-Antonio text-base leading-relaxed phone:w-8/12 md:w-5/12">
        <AnimUp inView={inView}>
          <p>
            A good user experience is vital for online business success. It
            includes easy navigation, aesthetic design, and fast performance,
            which build trust, increase engagement, and drive sales. Using the
            latest technologies ensures compatibility, accessibility,
            development ease, and security, providing innovation and quality.
          </p>
        </AnimUp>
      </div>
      <Line position={"bottom-left"} />
    </LayoutSection>
  );
}

export default Experience; 