import { useGLTF } from "@react-three/drei";

export function Station() {
  const { scene } = useGLTF("/models/spaceStation.glb");

  return <primitive object={scene} scale={8.5} position={[2.6, 9, 0]} />;
}

useGLTF.preload("/models/spaceStation.glb");
