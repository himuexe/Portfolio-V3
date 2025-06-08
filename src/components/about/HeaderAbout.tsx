"use client";
import { useInView } from "react-intersection-observer";
import WordAnim from "../animated/WordAnim";
import TextTileComp from "./TextTileComp";
import Image from "next/image";
import { useState, useEffect } from "react";

function HeaderAbout() {
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
    <div className="h-screen overflow-hidden">
      {/* Static Image - Always visible */}
      <div className="absolute right-0 top-0 z-10">
        <Image
          priority
          className="translate-x-[10%] animate-fadeIn object-cover"
          src="/image/me.jpeg"
          alt="Profile picture"
          width={800}
          height={600}
          sizes="(max-width: 1024px) 100vw, 50vw"
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
      
      <div
        ref={ref}
        className="pointer-events-none absolute left-0 top-0 z-20 flex h-screen w-full flex-col items-center justify-center font-Antonio"
      >
        <div className="flex h-full w-full max-w-[150rem] flex-col justify-between px-5 pt-20 lg:flex-row lg:px-10">
          <div className="flex h-full w-full flex-col justify-end pb-10 pr-20 lg:w-1/2 lg:justify-between">
            <h1 className="hidden">About me</h1>
            <div className="max-w-[38rem] -translate-x-5 scale-95">
              <WordAnim word="Himanshu" isAnim={shouldAnimate} />
              <WordAnim word="Sharma" isAnim={shouldAnimate} />
            </div>
            <div className="w-full">
              <div className="flex w-full flex-col justify-between space-y-3 py-5 lg:flex-row lg:space-x-5 lg:space-y-0">
                <TextTileComp
                  inView={shouldAnimate}
                  title="Location"
                  text="Jaipur, India"
                />
                <TextTileComp
                  inView={shouldAnimate}
                  title="Born"
                  text="23-02-2004"
                />
                <TextTileComp
                  inView={shouldAnimate}
                  title="Focus"
                  text="Digital, Development, Design, Motion"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderAbout; 