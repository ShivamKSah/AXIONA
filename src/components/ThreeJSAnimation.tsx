
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedObjectProps {
  position: [number, number, number];
  isTyping: boolean;
  type: 'sphere' | 'box' | 'torus';
  color: string;
}

const AnimatedObject: React.FC<AnimatedObjectProps> = ({ position, isTyping, type, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create dynamic color based on typing state
  const dynamicColor = useMemo(() => {
    const baseColor = new THREE.Color(color);
    return isTyping ? baseColor.multiplyScalar(1.5) : baseColor;
  }, [color, isTyping]);

  useFrame((state) => {
    if (meshRef.current) {
      // Base rotation speed
      const baseSpeed = 0.005;
      const typingMultiplier = isTyping ? 4 : 1;
      
      // Rotate based on typing state
      meshRef.current.rotation.x += baseSpeed * typingMultiplier;
      meshRef.current.rotation.y += baseSpeed * typingMultiplier * 1.2;
      
      // Add floating motion
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.2;
      
      // Scale based on typing
      const scale = isTyping ? 1 + Math.sin(time * 10) * 0.1 : 1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  const renderObject = () => {
    switch (type) {
      case 'sphere':
        return (
          <sphereGeometry args={[0.8, 32, 32]} />
        );
      case 'box':
        return (
          <boxGeometry args={[1.2, 1.2, 1.2]} />
        );
      case 'torus':
        return (
          <torusGeometry args={[0.8, 0.3, 16, 100]} />
        );
      default:
        return (
          <sphereGeometry args={[0.8, 32, 32]} />
        );
    }
  };

  return (
    <mesh ref={meshRef} position={position}>
      {renderObject()}
      <meshStandardMaterial 
        color={dynamicColor} 
        emissive={isTyping ? new THREE.Color(color).multiplyScalar(0.2) : new THREE.Color(0x000000)}
        roughness={0.3}
        metalness={0.7}
      />
    </mesh>
  );
};

const ParticleField: React.FC<{ isTyping: boolean }> = ({ isTyping }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlesCount = 1000;
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      const typingIntensity = isTyping ? 2 : 0.5;
      pointsRef.current.rotation.x = time * 0.05 * typingIntensity;
      pointsRef.current.rotation.y = time * 0.02 * typingIntensity;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isTyping ? 0.05 : 0.02}
        color={isTyping ? "#60a5fa" : "#1e40af"}
        transparent
        opacity={isTyping ? 0.8 : 0.4}
      />
    </points>
  );
};

interface ThreeJSAnimationProps {
  isTyping: boolean;
}

export const ThreeJSAnimation: React.FC<ThreeJSAnimationProps> = ({ isTyping }) => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={isTyping ? 1.5 : 1} 
          color={isTyping ? "#60a5fa" : "#ffffff"}
        />
        <pointLight 
          position={[-10, -10, -5]} 
          intensity={isTyping ? 0.8 : 0.5}
          color="#a855f7"
        />

        {/* Animated Objects */}
        <AnimatedObject position={[-3, 0, 0]} isTyping={isTyping} type="sphere" color="#3b82f6" />
        <AnimatedObject position={[0, 0, 0]} isTyping={isTyping} type="box" color="#8b5cf6" />
        <AnimatedObject position={[3, 0, 0]} isTyping={isTyping} type="torus" color="#06b6d4" />
        
        {/* Additional objects for depth */}
        <AnimatedObject position={[-1.5, 2, -2]} isTyping={isTyping} type="sphere" color="#ec4899" />
        <AnimatedObject position={[1.5, -2, -2]} isTyping={isTyping} type="torus" color="#f59e0b" />

        {/* Particle field */}
        <ParticleField isTyping={isTyping} />

        {/* Controls */}
        <OrbitControls 
          enablePan={false} 
          enableZoom={false}
          autoRotate
          autoRotateSpeed={isTyping ? 2 : 0.5}
        />
      </Canvas>
    </div>
  );
};
