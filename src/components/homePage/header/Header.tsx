"use client";
import dynamic from "next/dynamic";
import WordAnim from "@/components/animated/WordAnim";
import AnimUp from "@/components/animated/AnimUp";
import { useInView } from "react-intersection-observer";
import { Suspense, useState, useEffect } from "react";

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

  const [textColor, setTextColor] = useState('#ffffff');
  const [mixBlendMode, setMixBlendMode] = useState('difference');
  const [animationsReady, setAnimationsReady] = useState(false);

  // Delay animations until after loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationsReady(true);
    }, 3000); // Wait for loading screen (2.7s) + small buffer

    return () => clearTimeout(timer);
  }, []);

  // Dynamic text color based on mouse position and scroll
  useEffect(() => {
    let mouseX = 0.5;
    let mouseY = 0.5;
    let scrollY = 0;

    const updateTextColor = () => {
      // Calculate background brightness based on mouse position and scroll
      // This mimics the shader logic for determining when background is light
      const mouseDistance = Math.sqrt(
        Math.pow(mouseX - 0.5, 2) + Math.pow(mouseY - 0.5, 2)
      );
      const mouseEffect = Math.max(0, 1 - mouseDistance * 2);
      const scrollInfluence = Math.sin(scrollY * 0.01) * 0.5 + 0.5;
      
      // Estimate brightness based on shader logic
      const estimatedBrightness = 
        0.3 + // base brightness
        mouseEffect * 0.4 + // mouse proximity effect
        scrollInfluence * 0.2; // scroll effect

      // Switch text color based on estimated background brightness
      if (estimatedBrightness > 0.6) {
        setTextColor('#000000');
        setMixBlendMode('normal');
      } else {
        setTextColor('#ffffff');
        setMixBlendMode('difference');
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX / window.innerWidth;
      mouseY = 1.0 - event.clientY / window.innerHeight;
      updateTextColor();
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
      updateTextColor();
    };

    // Initial update
    updateTextColor();

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Update periodically to sync with animation
    const interval = setInterval(updateTextColor, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  // Combine inView and animationsReady for proper timing
  const shouldAnimate = inView && animationsReady;

  return (
    <div className="top-0 flex h-screen w-full flex-col lg:sticky">
      <div style={{ width: "100%", height: "100%" }}>
        <Suspense fallback={<div className="h-full w-full bg-gradient-to-b from-gray-900 to-black" />}>
          <ThreeCanvas />
        </Suspense>
      </div>

      <div
        ref={ref}
        className="pointer-events-none absolute left-1/2 z-10 flex h-screen w-full max-w-[150rem] -translate-x-1/2 flex-col items-center justify-end px-5 font-humane lg:px-10"
        style={{
          color: textColor,
          mixBlendMode: mixBlendMode as any,
          transition: 'color 0.3s ease, mix-blend-mode 0.3s ease'
        }}
      >
        <div className="mb-24 w-full md:mb-10">
          <AnimUp inView={shouldAnimate} duration={2.5}>
            <h2 className="mb-2 font-Antonio text-lg md:text-xl lg:text-2xl">
              WELCOME TO MY PORTFOLIO
            </h2>
          </AnimUp>

          <h1>
            <WordAnim word="Full Stack" isAnim={shouldAnimate} variant="slide" staggerDelay={0.08} />
          </h1>

          <h1 className="flex flex-col md:flex-row">
            <div className="mr-0 md:mr-5">
              <WordAnim word="WEB" isAnim={shouldAnimate} variant="scale" staggerDelay={0.12} />
            </div>

            <WordAnim word="DEVELOPER" isAnim={shouldAnimate} variant="rotate" staggerDelay={0.06} />
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Header; 