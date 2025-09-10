import React, { Suspense, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Environment, Float, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';

function Loader() {
  const { progress } = useProgress();
  return <Html center><div style={{fontWeight:700}}>{progress.toFixed(0)}%</div></Html>;
}

function FloatingLogo() {
  const texture = useLoader(THREE.TextureLoader, '/brand.png');
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ map: texture, transparent: true, roughness: 0.3, metalness: 0.1 }), [texture]);
  const ref = React.useRef();

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.35;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={ref}>
        <planeGeometry args={[2.2, 2.2]} />
        <primitive object={mat} attach="material" />
      </mesh>
    </Float>
  );
}

const LogoScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
      <ambientLight intensity={0.8}/>
      <directionalLight position={[3,3,2]} intensity={1.1}/>
      <Suspense fallback={<Loader />}>
        <FloatingLogo />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
};

export default LogoScene;
