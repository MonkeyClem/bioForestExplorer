import { Sparkles } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";

type TransitionCorridorProps = {
  length?: number;
  width?: number;
  height?: number;
  stationPowered: boolean
} & ThreeElements["group"];

export function TransitionCorridor({
  length = 20,
  width = 8,
  height = 6.6,
  stationPowered,
  ...groupProps
}: TransitionCorridorProps) {
  return (
    <group {...groupProps}>
      {/* Sol */}
      <mesh position={[0, 0, -length / 2]}>
        <boxGeometry args={[width, 0.15, length]} />
        <meshStandardMaterial color="#080c16" />
      </mesh>

      {/* Mur gauche */}
      <mesh position={[-width / 2, height / 2, -length / 2]}>
        <boxGeometry args={[0.15, height, length]} />
        <meshStandardMaterial color="#0b1020" />
      </mesh>

      {/* Mur droit */}
      <mesh position={[width / 2, height / 2, -length / 2]}>
        <boxGeometry args={[0.15, height, length]} />
        <meshStandardMaterial color="#0b1020" />
      </mesh>

      {/* Plafond */}
      <mesh position={[0, height, -length / 2]}>
        <boxGeometry args={[width, 0.15, length]} />
        <meshStandardMaterial color="#060914" />
      </mesh>


  <pointLight
    color="#b30f97"
    position={[0, 10 ,0]}
    intensity={stationPowered ? 200 : 0}
    distance={stationPowered ? 200 : 0}
  />

      {stationPowered && (
  <Sparkles
    count={600}
    position={[-10, 1.5, -8]}
    scale={[10, 25, 10]}
    size={2.5}
    opacity={0.7}
    speed={2}
    color="#3dc2fb"
  />)}
    </group>
  );
}