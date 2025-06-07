"use client";

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

interface LenisScrollProviderProps {
  children: ReactNode;
}

export default function LenisScrollProvider({ children }: LenisScrollProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.06,
        duration: 2,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children}
    </ReactLenis>
  );
} 