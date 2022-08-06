import React, { useEffect, useState, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, TrackballControls } from "@react-three/drei";
import { Vector3 } from "three";
import SceneModel from "./SceneModel";

function CanvasContent({ card, cameraPosition, slideChange }) {
  const context = useThree();
  const objVec = new Vector3(0, -1.5, 0);

  const spotLight = useRef();

  useEffect(() => {
    context.camera.lookAt(objVec);
    context.camera.updateProjectionMatrix();
  }, []);

  return (
    <>
      <hemisphereLight color={"white"} groundColor={0x080820} intensity={1} />
      <spotLight
        ref={spotLight}
        intensity={1}
        castShadow={true}
        color={0xffffff}
        position={[32.2, 56, 4]}
      />

      <SceneModel
        frontImage={card.image2}
        backImage={card.image3}
        podiumColor={parseInt(`0x${card.podiumColor}`)}
        wallColor={parseInt(`0x${card.backgroundColor}`)}
        slideChange={slideChange}
      />

      <OrbitControls
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        enableZoom={false}
        minDistance={3}
        maxDistance={9}
        target={[0, 0, 0]}
      />

      <TrackballControls
        noRotate={true}
        noPan={true}
        noZoom={false}
        zoomSpeed={1.4}
        dynamicDampingFactor={0.12}
      />
    </>
  );
}

export default function SceneCanvas({ card, cameraPosition, slideChange }) {
  const [fieldOfView, setFieldOfView] = useState(120);

  return (
    <>
      <Canvas
        camera={{
          type: "PerspectiveCamera",
          position: Object.values(cameraPosition),
          fov: fieldOfView,
          zoom: 2.2,
          rotation: { y: Math.PI / 2 },
        }}
        shadows={true}
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: `#${card.backgroundColor}`,
        }}
      >
        <CanvasContent
          card={card}
          cameraPosition={cameraPosition}
          slideChange={slideChange}
        />
      </Canvas>
    </>
  );
}
