import React, { useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SceneModel from "./SceneModels";

function CanvasContent({ card, cameraPosition }) {
  const context = useThree();

  useEffect(() => {
    // //TODO: Remove all of this once the final camera position has been chosen
    // const { GUI } = require("dat.gui");
    // const gui = new GUI();
    // const cameraFolder = gui.addFolder("Camera");
    // cameraFolder.add(context.camera.position, "x", -100, 100);
    // cameraFolder.add(context.camera.position, "y", -100, 100);
    // cameraFolder.add(context.camera.position, "z", -100, 100);
    // cameraFolder.open();
    // const lookAtFolder = gui.addFolder("Camera Fov");
    // lookAtFolder.add(context.camera, "fov", -100, 100);
    // lookAtFolder.open();
    // const datEl = document.querySelector(".dg");
    // datEl.style.zIndex = "50";
    // console.log(datEl);
  }, []);

  return (
    <>
      <hemisphereLight color={"white"} groundColor={0x080820} intensity={0.5} />
      <spotLight
        intensity={0.7}
        castShadow={true}
        color={0xffffff}
        // shadow={{
        //   bias: -0.0001,
        //   mapSize: [1024 * 4, 1024 * 4],

        // }}
        position={[
          cameraPosition.x + 10,
          cameraPosition.y + 10,
          cameraPosition.z + 10,
        ]}
      />

      <SceneModel
        frontImage={card.image2}
        backImage={card.image3}
        podiumColor={parseInt(`0x${card.podiumColor}`)}
      />

      <OrbitControls
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2.5}
        minZoom={1}
        maxZoom={4}
        minDistance={10}
        maxDistance={20}
      />
    </>
  );
}

export default function SceneCanvas({ card, cameraPosition }) {
  const [fieldOfView, setFieldOfView] = useState(50);

  return (
    <>
      <Canvas
        camera={{
          type: "PerspectiveCamera",
          position: Object.values(cameraPosition),
          fov: fieldOfView,
          zoom: 1.8,
          rotation: { y: Math.PI / 2 },
        }}
        shadows={true}
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: `#${card.backgroundColor}`,
        }}
      >
        <CanvasContent card={card} cameraPosition={cameraPosition} />
      </Canvas>
    </>
  );
}
