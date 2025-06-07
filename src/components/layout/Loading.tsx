"use client";
import { useIsLoaderFromStore } from "@/store/isLoader.slice";
import React, { useEffect, useState } from "react";

export default function Loading() {
  const { isLoader, dispatchToggleIsLoader } = useIsLoaderFromStore();
  const [count, setCount] = useState(0);

  // Declare newCount outside useEffect to match V2
  let newCount = 0;

  useEffect(() => {
    // Hide loading screen after 2 seconds
    setTimeout(() => {
      if (isLoader.active) {
        dispatchToggleIsLoader();
      }
    }, 2000);

    // Counting animation
    const counting = setInterval(() => {
      newCount++;
      setCount(newCount);

      if (newCount >= 100) {
        clearInterval(counting);
      }
    }, 12);

    // No cleanup function to match V2
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to match V2

  return (
    <>
      <div
        className={`fixed top-0 z-[99] flex h-screen w-screen flex-col items-center justify-center bg-background text-white ${
          isLoader.active ? "translate-y-0" : "-translate-y-full"
        } transform duration-[2000ms]`}
      >
        <h2 className="absolute bottom-24 right-0 font-humane text-[20rem] leading-[0.8] lg:bottom-0 lg:right-10">
          {count}
        </h2>
      </div>
      <div
        className={`fixed top-0 z-40 flex h-screen w-screen flex-col items-center justify-center bg-white text-white ${
          isLoader.active ? "translate-y-96" : "-translate-y-full"
        } transform duration-[2000ms]`}
      />
    </>
  );
} 