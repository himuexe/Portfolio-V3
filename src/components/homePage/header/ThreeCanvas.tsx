"use client";
import { Canvas } from "@react-three/fiber";
import HeaderBackground from "./HeaderBackground";

function ThreeCanvas() {
  return (
    <Canvas 
      performance={{ min: 0.1 }} 
      gl={{ 
        antialias: false,
        powerPreference: "high-performance",
        alpha: false,
      }}
      dpr={[1, 2]} 
    >
      <HeaderBackground />
    </Canvas>
  );
}

export default ThreeCanvas; 