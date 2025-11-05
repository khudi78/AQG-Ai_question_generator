import React, { useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function Stars() {
  const ref = React.useRef();

  const points = useMemo(() => {
    const p = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20; // wider spread
      p[i * 3 + 1] = (Math.random() - 0.5) * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return p;
  }, []);

  // slowly rotate the stars
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 25;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#255F38"
          size={0.05}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function Mainhome() {
  return (
    <div className="relative h-screen w-full overflow-hidden text-white flex flex-col items-center justify-center">
      {/* 3D star field */}
      <Canvas camera={{ position: [0, 0, 4], fov: 75 }}>
        <Stars />
      </Canvas>

      {/* Overlay text */}
      <div className="absolute text-center">
        <div className=" text-7xl font-bold mb-6 text-[#255F38] drop-shadow-[0_0_20px_#10b981]">
          AI Question Generator
        </div>
        <p className="text-2xl text-emerald-600">
          Let AI craft your next exam in seconds.
        </p>
      </div>
    </div>
  );
}
