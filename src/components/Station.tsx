import { animated, useSpring } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from 'three'

export function Station() {
  const { scene } = useGLTF("/models/spaceStation.glb");

  return <primitive object={scene} scale={8.5} position={[2.6, 9, 0]} />;
}

useGLTF.preload("/models/spaceStation.glb");



type GrassProps = {
  stationPowered? : boolean
}&ThreeElements["group"]

import { Clone } from "@react-three/drei";
import {  useMemo } from "react";


type GrassFieldProps = {
  count?: number;
  width?: number;
  depth?: number;
};

export function AlienGrassField({
  count = 100,
  width = 50,
  depth = 40,
}: GrassFieldProps) {
  const { scene } = useGLTF("/models/grassPatch.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const material = child.material;

        if (material instanceof THREE.MeshStandardMaterial) {
          material.color = new THREE.Color("#19dff1");
          material.emissive = new THREE.Color("#19dff1");
          material.emissiveIntensity = 1.5;
          material.roughness = 0.9;
          material.metalness = 0;
        }
      }
    });
  }, [scene]);

  const instances = useMemo(() => {
    return Array.from({ length: count }, (_, index) => ({
      id: index,
      position: [
        (Math.random() - 0.5) * width,
        0,
        (Math.random() - 0.5) * depth,
      ] as [number, number, number],
      rotation: [0, Math.random() * Math.PI * 2, 0] as [number, number, number],
      scale: 1.2 + Math.random() * 1.4,
    }));
  }, [count, width, depth]);

  return (
    <group>
      {instances.map((grass) => (
        <Clone
          key={grass.id}
          object={scene}
          position={grass.position}
          rotation={grass.rotation}
          scale={grass.scale}
        />
      ))}
    </group>
  );
}

type CrystalProps = {
  stationPowered? : boolean
}&ThreeElements["group"]


export function Crystal({}: CrystalProps) {
      const { scene } = useGLTF("/models/crystal.glb");
        useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const material = child.material;

        if (material instanceof THREE.MeshStandardMaterial) {
          material.emissive = new THREE.Color("#0f44ca");
          material.emissiveIntensity = 1.5;
          material.roughness = 2
          material.metalness = 2
        }
      }
    });
  }, [scene]);
  

        return <primitive object={scene} scale={1} position={[-40, 0, -10]} />;

}
useGLTF.preload("/models/crystal.glb");



interface plantInterfae {
    stationPowered? : boolean
}


export function Plant({stationPowered} : plantInterfae) {
      const { scene } = useGLTF("/models/plant.glb");


      

    useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const material = child.material;

        if (material instanceof THREE.MeshStandardMaterial) {
          material.emissive = new THREE.Color("#66a1ff");
          material.emissiveIntensity = stationPowered ? 0 : 0;
        }
      }
    });
  }, [scene, stationPowered]);
  

    const { scale } = useSpring({
    scale: stationPowered ? 5 : 1,
    // config: { mass: 2, tension: 80, friction: 30 },
  });
  

  return     <animated.group scale={scale} position={[40, 0, -10]}>
      <primitive object={scene} />
    </animated.group>
}