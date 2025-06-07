"use client";
import React, { useEffect, useState } from "react";
import AnimUp from "../animated/AnimUp";
import { usePathname } from "next/navigation";
import { useInView } from "react-intersection-observer";

function PageTransition({
  children,
  value,
}: {
  children: React.ReactNode;
  value?: string;
}) {
  const [transitionComplete, setTransitionComplete] = useState(false);
  const pathName = usePathname();

  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const generatePathName = (pathName: string) => {
    const array = pathName.split("");
    array.shift();

    let foundSlash = false;
    const result = [];

    if (array.length === 0) {
      return "HOME";
    } else {
      for (let i = 0; i < array.length; i++) {
        if (array[i] === "/") {
          foundSlash = true;
          continue; // Skip to next element after finding "/"
        }

        if (foundSlash) {
          result.push(array[i]);
        }
      }

      if (foundSlash) {
        return result.join("");
      } else {
        return array.join("");
      }
    }
  };

  useEffect(() => {
    // Set transition complete after animation duration (2.5s)
    const timer = setTimeout(() => {
      setTransitionComplete(true);
    }, 2700); // Add a little extra time to ensure animations complete

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!transitionComplete && (
        <>
          <div
            ref={ref}
            className="page-transition fixed z-50 flex h-screen w-full items-center justify-center bg-background"
          >
            <AnimUp inView={inView} duration={1} y={100}>
              <h1 className="font-humane text-[14rem] uppercase lg:text-[20rem]">
                {value
                  ? value.toUpperCase()
                  : generatePathName(pathName.toUpperCase())}
              </h1>
            </AnimUp>
          </div>
          <div
            className="underpage-transition fixed z-40 flex h-screen w-full flex-col items-center justify-center bg-white text-white"
          />
        </>
      )}
      <div 
        className={`${transitionComplete ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
      >
        {children}
      </div>
    </>
  );
}

export default PageTransition; 