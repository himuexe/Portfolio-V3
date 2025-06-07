"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface RigProps {
  children: React.ReactNode;
}

function Rig({ children }: RigProps) {
  const ref = useRef<THREE.Group>(null);
  const vec = new THREE.Vector3();
  const { camera, mouse } = useThree();
  
  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 1, 1 + mouse.y * 0.5, 21), 0.05);
    camera.lookAt(0, 0, 0);
  });
  
  return (
    <group position={[0, 0, 0]} ref={ref}>
      {children}
    </group>
  );
}

export default Rig; 