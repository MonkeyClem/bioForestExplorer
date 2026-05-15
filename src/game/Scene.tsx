import { useGLTF, Sparkles } from "@react-three/drei";
import { Console } from "../components/Console";
import { Crystal, Plant, Station } from "../components/Station";
import { TransitionCorridor } from "../components/TransitionCorridor";
import { AlienPlant } from "../components/AlienPlant";



import { useFrame } from "@react-three/fiber";
import type { ThreeElements } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type GiantAlienTreeProps = ThreeElements["group"];

export function GiantAlienTree(props: GiantAlienTreeProps) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.elapsedTime;

    ref.current.rotation.z = Math.sin(t * 0.18) * 0.015;
  });

  return (
    <group ref={ref} {...props}>
      {/* Tronc immense */}
      <mesh position={[0, 8, 0]}>
        <cylinderGeometry args={[1.4, 2.4, 16, 7]} />
        <meshStandardMaterial
          color="#826b9b"
          emissive="#826b9b"
          emissiveIntensity={0.25}
          roughness={0.9}
        />
      </mesh>

      {/* Couronne / masse organique */}
      <mesh position={[0, 17, 0]}>
        <icosahedronGeometry args={[5, 1]} />
        <meshStandardMaterial
          color="#24103a"
          emissive="#18072a"
          emissiveIntensity={0.6}
          roughness={0.8}
        />
      </mesh>

      {/* Noyaux bioluminescents */}
      {/* <mesh position={[1.8, 13, 1]}>
        <sphereGeometry args={[0.55, 12, 12]} />
        <meshStandardMaterial
          color="#7fffee"
          emissive="#7fffee"
          emissiveIntensity={60}
        />
      </mesh> */}

      <mesh position={[-2.2, 16.5, -1.2]}>
        <sphereGeometry args={[0.4, 12, 12]} />
        <meshStandardMaterial
          color="#9b6cff"
          emissive="#9b6cff"
          emissiveIntensity={4}
        />
      </mesh>

      {/* Lumière douce locale */}

      
      <pointLight
        position={[0, 9, 25]}
        color="#df07be"
        intensity={2000}
        distance={20}
      />
    </group>
  );
}


export interface SceneProps {
  onActivateConsole: () => void;
  stationPowered: boolean
}

export function Scene({ onActivateConsole, stationPowered}: SceneProps) {
  return (
    <>
      <gridHelper args={[200, 200, "#444466", "#222233"]} />
      <axesHelper args={[30]} />

      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial color="#355ad7" />
      </mesh>

{/* 
{stationPowered &&      <mesh position={[1, 7, 1]}>
        <Sparkles
          count={800}
          scale={[60, 10, 30]}
          size={2.5}
          speed={0.2}
          color="#88ccff"
          
        />
      </mesh> } */}







      <Station />
      {/* <Crystal/> */}
      <TransitionCorridor position={[35, 3.5 , 2.5]} rotation={[0, -1.8, 0]} stationPowered={stationPowered}/>
      <Console onActivate={onActivateConsole} />
      <AlienPlant
      stationPowered={stationPowered}
  position={[45, 0, -9]}
  scale={3}
/>
<GiantAlienTree   position={[60, 0, -15]}
 />

<Plant/>
    </>
  );
}
