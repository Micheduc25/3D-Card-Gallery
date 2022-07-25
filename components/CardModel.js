import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function CardModel({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/Carte collectionable.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Support.geometry} material={materials.Verre}>
        <group
          position={[0, 1.6, 0.01]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 0.25, 1]}
        >
          <mesh geometry={nodes.Plane003.geometry} material={materials.Image} />
          <mesh
            geometry={nodes.Plane003_1.geometry}
            material={materials["Matériau carte"]}
          />
        </group>
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/Carte collectionable.gltf");
