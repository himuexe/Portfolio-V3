"use client";
import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

// Custom particle shader material
extend({
  ParticleMaterial: shaderMaterial(
    {
      uTime: 0,
      uMouse: new THREE.Vector2(0.5, 0.5),
      uSize: 2.0,
      uOpacity: 0.6,
      uColor: new THREE.Color("#ffffff"),
    },
    // Vertex Shader
    `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uSize;
    
    attribute float aScale;
    attribute float aSpeed;
    attribute vec3 aOffset;
    
    varying float vAlpha;
    
    void main() {
      vec3 pos = position;
      
      // Add floating animation
      pos.y += sin(uTime * aSpeed + aOffset.x) * 0.3;
      pos.x += cos(uTime * aSpeed * 0.7 + aOffset.y) * 0.2;
      
      // Mouse influence
      vec2 mouseInfluence = (uMouse - 0.5) * 2.0;
      pos.xy += mouseInfluence * 0.1 * aScale;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      // Size based on distance and scale
      gl_PointSize = uSize * aScale * (300.0 / -mvPosition.z);
      
      // Alpha based on distance from mouse
      float mouseDistance = distance(pos.xy, mouseInfluence);
      vAlpha = 1.0 - smoothstep(0.0, 2.0, mouseDistance);
    }
    `,
    // Fragment Shader
    `
    uniform float uOpacity;
    uniform vec3 uColor;
    
    varying float vAlpha;
    
    void main() {
      // Create circular particles
      float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
      float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
      
      // Combine with vertex alpha and opacity
      alpha *= vAlpha * uOpacity;
      
      gl_FragColor = vec4(uColor, alpha);
    }
    `
  ),
});

interface ParticleSystemProps {
  count?: number;
  spread?: number;
}

function ParticleSystem({ count = 100, spread = 10 }: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<any>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  // Generate particle attributes
  const { positions, scales, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Random positions within viewport bounds
      positions[i3] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = (Math.random() - 0.5) * 5;
      
      // Random scales
      scales[i] = Math.random() * 0.5 + 0.5;
      
      // Random speeds
      speeds[i] = Math.random() * 0.5 + 0.5;
      
      // Random offsets for animation variation
      offsets[i3] = Math.random() * Math.PI * 2;
      offsets[i3 + 1] = Math.random() * Math.PI * 2;
      offsets[i3 + 2] = Math.random() * Math.PI * 2;
    }

    return { positions, scales, speeds, offsets };
  }, [count, spread]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: event.clientX / window.innerWidth,
        y: 1.0 - event.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime += delta;
      materialRef.current.uMouse.lerp(
        new THREE.Vector2(mouse.x, mouse.y),
        delta * 2.0
      );
    }
  });

  return (
    <Points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aScale"
          args={[scales, 1]}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          args={[speeds, 1]}
        />
        <bufferAttribute
          attach="attributes-aOffset"
          args={[offsets, 3]}
        />
      </bufferGeometry>
      {React.createElement("particleMaterial", {
        ref: materialRef,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uSize: 3.0,
        uOpacity: 0.4,
        uColor: new THREE.Color("#ffffff"),
      })}
    </Points>
  );
}

export default ParticleSystem; 