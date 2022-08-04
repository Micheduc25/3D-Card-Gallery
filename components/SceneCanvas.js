import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import NewSceneModel from "./NewSceneModel";
import { Vector3 } from "three";

function CanvasContent({ card, cameraPosition, slideChange }) {
  const context = useThree();
  const objVec = new Vector3(0, -1.5, 0);

  const spotLight = useRef();

  useEffect(() => {
    context.camera.lookAt(objVec);
    context.camera.updateProjectionMatrix();
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

    // const spotLightFolder = gui.addFolder("Spot Light");
    // spotLightFolder.add(spotLight.current.position, "x", -100, 100);
    // spotLightFolder.add(spotLight.current.position, "y", -100, 100);
    // spotLightFolder.add(spotLight.current.position, "z", -100, 100);
    // const datEl = document.querySelector(".dg");
    // datEl.style.zIndex = "50";
    // // console.log(datEl);

    //-29.9 -12 10
    //21.3 15 12
  }, []);

  // useEffect(() => {
  //   console.log("slide has changed ohhh", slideChange);
  // }, [slideChange]);

  return (
    <>
      <hemisphereLight color={"white"} groundColor={0x080820} intensity={0.5} />
      <spotLight
        ref={spotLight}
        intensity={0.8}
        castShadow={true}
        color={0xffffff}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={400}
        shadow-camera-far={1000}
        shadow-camera-fov={30}
        position={[
          cameraPosition.x + 8,
          cameraPosition.y + 10,
          cameraPosition.z + 10,
        ]}
      />

      <NewSceneModel
        frontImage={card.image2}
        backImage={card.image3}
        podiumColor={parseInt(`0x${card.podiumColor}`)}
        wallColor={parseInt(`0x${card.backgroundColor}`)}
        slideChange={slideChange}
      />

      <OrbitControls
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2.5}
        minZoom={3}
        maxZoom={6}
        minDistance={10}
        maxDistance={20}
        autoRotate={true}
        target={[0, 0, 0]}
      />
    </>
  );
}

export default function SceneCanvas({ card, cameraPosition, slideChange }) {
  const [fieldOfView, setFieldOfView] = useState(50);

  return (
    <>
      <Canvas
        camera={{
          type: "PerspectiveCamera",
          position: Object.values(cameraPosition),
          fov: fieldOfView,
          zoom: 2,
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