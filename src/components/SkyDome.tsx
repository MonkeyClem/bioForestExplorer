import * as THREE from "three";

export function SkyDome() {
  return (
    <mesh >
      <sphereGeometry args={[200, 30, 30]} />
      <meshBasicMaterial
        color="#020f1b"
        side={THREE.BackSide}
        fog={false}
      />
    </mesh>
  );
}