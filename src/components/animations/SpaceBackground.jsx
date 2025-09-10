import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

// Este componente es el que realmente anima las estrellas
function RotatingStars() {
  const starsRef = useRef();

  // useFrame es un hook que ejecuta código en cada frame (60 veces por segundo)
  useFrame(() => {
    if (starsRef.current) {
      // Rotamos el grupo de estrellas lentamente
      starsRef.current.rotation.x += 0.0001;
      starsRef.current.rotation.y += 0.0001;
    }
  });

  return <Stars ref={starsRef} radius={100} depth={50} count={5000} factor={4} saturation={0} fade />;
}

// Este es el componente principal que exportaremos
const SpaceBackground = () => {
  return (
    <div className="space-background-canvas">
      {/* Canvas es el lienzo donde se renderiza la escena 3D */}
      <Canvas camera={{ position: [0, 0, 1] }}>
        {/* Suspense es un componente de React que muestra un 'fallback'
            mientras los componentes 3D están cargando. */}
        <Suspense fallback={null}>
          <RotatingStars />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SpaceBackground;