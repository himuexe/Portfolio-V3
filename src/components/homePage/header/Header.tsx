"use client";
import dynamic from "next/dynamic";
import WordAnim from "@/components/animated/WordAnim";
import AnimUp from "@/components/animated/AnimUp";
import { useInView } from "react-intersection-observer";
import { Suspense } from "react";

// Lazy load the Three.js Canvas component
const ThreeCanvas = dynamic(() => import("./ThreeCanvas"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gradient-to-b from-gray-900 to-black" />
  ),
});

function Header() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div className="top-0 flex h-screen w-full flex-col lg:sticky">
      <div style={{ width: "100%", height: "100%" }}>
        <Suspense fallback={<div className="h-full w-full bg-gradient-to-b from-gray-900 to-black" />}>
          <ThreeCanvas />
        </Suspense>
      </div>

      <div
        ref={ref}
        className="pointer-events-none absolute left-1/2 z-10 flex h-screen w-full max-w-[150rem] -translate-x-1/2 flex-col items-center justify-end px-5 font-humane mix-blend-difference lg:px-10"
      >
        <div className="mb-24 w-full md:mb-10">
          <AnimUp inView={inView} duration={2.5}>
            <h2 className="mb-2 font-Antonio text-lg md:text-xl lg:text-2xl">
              WELCOME TO MY PORTFOLIO
            </h2>
          </AnimUp>

          <h1>
            <WordAnim word="Full Stack" isAnim={inView} />
          </h1>

          <h1 className="flex flex-col md:flex-row">
            <div className="mr-0 md:mr-5">
              <WordAnim word="WEB" isAnim={inView} />
            </div>

            <WordAnim word="DEVELOPER" isAnim={inView} />
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Header; 