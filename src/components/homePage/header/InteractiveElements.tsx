"use client";
import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sphere, Box, Octahedron, Torus } from "@react-three/drei";
import * as THREE from "three";

interface FloatingElementProps {
  position: [number, number, number];
  geometry: 'sphere' | 'box' | 'octahedron' | 'torus';
  scale: number;
  speed: number;
  mouseInfluence: number;
}

function FloatingElement({ position, geometry, scale, speed, mouseInfluence }: FloatingElementProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const originalPosition = useRef(position);
  const { viewport } = useThree();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    
    // Base floating animation
    const floatY = Math.sin(time * speed) * 0.2;
    const floatX = Math.cos(time * speed * 0.7) * 0.1;
    
    // Mouse influence
    const mouseOffsetX = mouse.x * mouseInfluence * viewport.width * 0.1;
    const mouseOffsetY = mouse.y * mouseInfluence * viewport.height * 0.1;
    
    // Combine animations
    meshRef.current.position.set(
      originalPosition.current[0] + floatX + mouseOffsetX,
      originalPosition.current[1] + floatY + mouseOffsetY,
      originalPosition.current[2]
    );
    
    // Subtle rotation
    meshRef.current.rotation.x += delta * speed * 0.5;
    meshRef.current.rotation.y += delta * speed * 0.3;
    meshRef.current.rotation.z += delta * speed * 0.2;
  });

  const renderGeometry = () => {
    const commonProps = {
      ref: meshRef,
      scale: scale,
    };

    const material = (
      <meshStandardMaterial
        color="#ffffff"
        transparent
        opacity={0.1}
        wireframe
        emissive="#ffffff"
        emissiveIntensity={0.05}
      />
    );

    switch (geometry) {
      case 'sphere':
        return <Sphere {...commonProps} args={[1, 16, 16]}>{material}</Sphere>;
      case 'box':
        return <Box {...commonProps} args={[1, 1, 1]}>{material}</Box>;
      case 'octahedron':
        return <Octahedron {...commonProps} args={[1]}>{material}</Octahedron>;
      case 'torus':
        return <Torus {...commonProps} args={[1, 0.4, 8, 16]}>{material}</Torus>;
      default:
        return <Sphere {...commonProps} args={[1, 16, 16]}>{material}</Sphere>;
    }
  };

  return (
    <group position={position}>
      {renderGeometry()}
    </group>
  );
}

function InteractiveElements() {
  const { viewport } = useThree();
  
  // Define floating elements with different properties
  const elements = [
    {
      position: [-viewport.width * 0.3, viewport.height * 0.2, -2] as [number, number, number],
      geometry: 'sphere' as const,
      scale: 0.5,
      speed: 0.8,
      mouseInfluence: 0.3,
    },
    {
      position: [viewport.width * 0.4, -viewport.height * 0.1, -3] as [number, number, number],
      geometry: 'octahedron' as const,
      scale: 0.3,
      speed: 1.2,
      mouseInfluence: 0.5,
    },
    {
      position: [-viewport.width * 0.1, -viewport.height * 0.3, -1.5] as [number, number, number],
      geometry: 'torus' as const,
      scale: 0.4,
      speed: 0.6,
      mouseInfluence: 0.4,
    },
    {
      position: [viewport.width * 0.2, viewport.height * 0.3, -2.5] as [number, number, number],
      geometry: 'box' as const,
      scale: 0.25,
      speed: 1.0,
      mouseInfluence: 0.6,
    },
    {
      position: [viewport.width * 0.1, viewport.height * 0.1, -4] as [number, number, number],
      geometry: 'sphere' as const,
      scale: 0.2,
      speed: 1.5,
      mouseInfluence: 0.7,
    },
  ];

  return (
    <>
      {/* Ambient lighting for the 3D elements */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.3} />
      
      {/* Render floating elements */}
      {elements.map((element, index) => (
        <FloatingElement
          key={index}
          position={element.position}
          geometry={element.geometry}
          scale={element.scale}
          speed={element.speed}
          mouseInfluence={element.mouseInfluence}
        />
      ))}
    </>
  );
}

export default InteractiveElements; 