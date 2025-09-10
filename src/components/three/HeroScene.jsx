import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Html, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { randFloatSpread } from 'three/src/math/MathUtils.js';

function Loader() {
  return <Html center><div style={{fontWeight:700}}>cargando…</div></Html>;
}

function Particles({ count = 1200 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = randFloatSpread(6);
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.03;
    ref.current.rotation.x += delta * 0.01;
  });

  return (
    <group>
      <Points positions={positions} ref={ref}>
        <PointMaterial transparent color="#2A6EF2" size={0.015} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
}

function LogoPlane() {
  const ref = useRef();
  const texture = useMemo(() => new THREE.TextureLoader().load('/brand.png'), []);
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map: texture,
        transparent: true,
        roughness: 0.25,
        metalness: 0.2,
        clearcoat: 1,
        clearcoatRoughness: 0.2,
        emissive: new THREE.Color('#194ed8'),
        emissiveIntensity: 0.35
      }),
    [texture]
  );

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y += delta * 0.25;
    ref.current.position.y = Math.sin(t * 1.2) * 0.15;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref}>
        <planeGeometry args={[2.2, 2.2]} />
        <primitive attach="material" object={material} />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
      <color attach="background" args={['transparent']} />
      <ambientLight intensity={1} />
      <directionalLight position={[2, 3, 2]} intensity={1.2} />
      <Suspense fallback={<Loader />}>
        <Particles />
        <LogoPlane />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
