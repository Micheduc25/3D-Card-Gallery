import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CardModel from "./CardModel";

export default function CardScene({}) {
  return (
    <>
      <Canvas
        camera={{ position: [2, -15, 15.25], fov: 15 }}
        style={{
          width: "100vw",
          height: "90vh",
          backgroundColor: "#cccccc",
        }}
      >
        <ambientLight intensity={1} />
        <ambientLight intensity={0.1} />
        <directionalLight intensity={0.4} />
        <Suspense fallback={null}>
          <CardModel />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </>
  );
}
