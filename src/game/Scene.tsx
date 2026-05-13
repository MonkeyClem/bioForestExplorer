import { useGLTF, Sparkles } from "@react-three/drei";
import { Console } from "../components/Console";
import { Station } from "../components/Station";

export interface SceneProps {
  onActivateConsole: () => void;
}

export function Scene({ onActivateConsole }: SceneProps) {
  return (
    <>
      <gridHelper args={[200, 200, "#444466", "#222233"]} />
      <axesHelper args={[30]} />

      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial color="#355ad7" />
      </mesh>

      <mesh position={[1, 7, 1]}>
        <Sparkles
          count={400}
          scale={[60, 4, 50]}
          size={2}
          speed={0.2}
          color="#88ccff"
        />
      </mesh>

      <Station />
      <Console onActivate={onActivateConsole} />
    </>
  );
}
