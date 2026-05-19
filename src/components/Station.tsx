import { animated, useSpring } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { ThreeElements, useFrame, Vector3 } from "@react-three/fiber";
import { useEffect, useRef } from "react";
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
  position : Vector3
  color: string
}&ThreeElements["group"];



export function AlienGrassField({
  count = 150,
  width = 40,
  depth = 40,
  position,
  color 
}: GrassFieldProps) {
  const { scene } = useGLTF("/models/grassPatch.glb");

  const ref = useRef<THREE.Group>(null)
  
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const material = child.material;

        if (material instanceof THREE.MeshStandardMaterial) {
          material.color = new THREE.Color(color);
          material.emissive = new THREE.Color(color);
          material.emissiveIntensity = 1.5;
          material.roughness = 0.9;
          material.metalness = 0;
        }
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.elapsedTime;

    ref.current.rotation.x =
      Math.sin(t * 3.5) * 9;

    ref.current.rotation.y =
      Math.cos(t * 3.6) * 4;
  });

  const instances = useMemo(() => {

    return Array.from({ length: count }, (_, index) => ({
      id: index,
      position: [
        (Math.random() ) * width,
        0,
        (Math.random() ) * depth,
      ] as [number, number, number],
      rotation: [0, Math.random() * Math.PI * 2, 0] as [number, number, number],
      scale: 0.5 + Math.random() * 1.4,
    }));
  }, [count, width, depth]);

 return (
  <group position={position}>
    {instances.map((grass) => (
      <AnimatedGrass
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



type AnimatedGrassProps = {
  object: THREE.Object3D;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
};

function AnimatedGrass({ object, position, rotation, scale }: AnimatedGrassProps) {
  const ref = useRef<THREE.Group>(null);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.elapsedTime;

    ref.current.rotation.z = rotation[2] + Math.sin(t * 1.5 + phase) * 0.04;
    ref.current.rotation.x = rotation[0] + Math.cos(t * 2.8 + phase) * 0.015;
  });

  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      <Clone object={object} />
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