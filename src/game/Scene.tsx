import { useGLTF, Sparkles } from "@react-three/drei";
import { Console } from "../components/Console";
import { AlienGrassField, Crystal,  Plant, Station } from "../components/Station";
import { TransitionCorridor } from "../components/TransitionCorridor";
import { AlienPlant } from "../components/AlienPlant";


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
  <planeGeometry args={[100, 100]} />
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

 <AlienGrassField color="#f795e3" position={[30, 0, 10]}/>
 <AlienGrassField color="#e3bce7" position={[30, 0, -25]}/>

 <pointLight position={[35, 3.5 , 2.5]} 
    intensity={400}
    distance={5}
    color={"#c60ec9"}/>

<Plant/>
    </>
  );
}
