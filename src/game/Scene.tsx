import { useGLTF, Sparkles } from "@react-three/drei";
import { Console } from "../components/Console";
import { AlienGrassField, Crystal,  Plant, Station } from "../components/Station";
import { TransitionCorridor } from "../components/TransitionCorridor";
import { AlienPlant } from "../components/AlienPlant";



import { useFrame } from "@react-three/fiber";
import type { ThreeElements } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useSpring } from "@react-spring/three";

type GiantAlienTreeProps = ThreeElements["group"];

export function GiantAlienTree(props: GiantAlienTreeProps) {
  const ref = useRef<THREE.Group>(null);

  const {} = useSpring({

  })

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.elapsedTime;

    ref.current.rotation.z = Math.sin(t * 0.18) * 0.015;
  });

  return (
    <group ref={ref} {...props} scale={6}>
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
          emissive="#0cd182"
          emissiveIntensity={6}
          roughness={0.8}
          fog={false}
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

      
      {/* <pointLight
        position={[0, 9, 25]}
        color="#df07be"
        intensity={2000}
        distance={200}
      /> */}
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
        <meshStandardMaterial color="#030303" />
      </mesh>

      <mesh
            rotation-x={-Math.PI / 2}
            position={[0, 0.15, -30]}
>
  <planeGeometry args={[300, 300]} />
  <meshStandardMaterial
    color="#0969c9"
    emissive={"#0969c9"}
    emissiveIntensity={2}
    transparent
    opacity={0.4}
    depthWrite={false}
  />
</mesh>


      <mesh
            rotation-x={-Math.PI / 2}
            position={[0, 0.15, -30]}
>
  <planeGeometry args={[300, 300]} />
  <meshStandardMaterial
    color="#0969c9"
    emissive={"#0897ea"}
    emissiveIntensity={0.1}
    transparent
    opacity={0.8}
    depthWrite={false}
  />
</mesh>



      <Station />
      <TransitionCorridor position={[35, 3.5 , 2.5]} rotation={[0, -1.8, 0]} stationPowered={stationPowered}/>
      <Crystal/>
      <Console onActivate={onActivateConsole} />
      <AlienPlant
      stationPowered={stationPowered}
  position={[45, 0, -9]}
  scale={3}
/>
<GiantAlienTree  position={[65, 0, -25]}
 />

 <AlienGrassField/>

 <pointLight position={[35, 3.5 , 2.5]} 
    intensity={400}
    distance={5}
    color={"#c60ec9"}/>

<Plant/>
    </>
  );
}
