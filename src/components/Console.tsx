import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type ConsoleProps = {
  onActivate: () => void;
};

export function Console({ onActivate }: ConsoleProps) {
  const consoleRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const [isNear, setIsNear] = useState(false);
  const [activated, setActivated] = useState(false);

  useFrame(() => {
    if (!consoleRef.current) return;

    const distance = camera.position.distanceTo(consoleRef.current.position);
    setIsNear(distance < 10.2);
  });

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === "KeyE" && isNear && !activated) {
        setActivated(true);
        onActivate?.();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isNear, activated, onActivate]);

  return (
    <group ref={consoleRef} position={[18, 3.1, 0]} scale={4} rotation={[0 , -5 , 0]}>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[1.2, 0.9, 0.5]} />
        <meshStandardMaterial color="#121827" />
      </mesh>

      <mesh position={[0, 0.85, -0.26]} rotation-x={-0.25}>
        <boxGeometry args={[0.9, 0.45, 0.04]} />
        <meshStandardMaterial
          color={activated ? "#66ffee" : "#223344"}
          emissive={activated ? "#66ffee" : "#0b1a22"}
          emissiveIntensity={activated ? 1 : 0.5}
        />
      </mesh>

      {isNear && !activated && (
        <Text
          position={[0, 0.5, -0.4]}
          rotation={[0, 3 , 0]}
          fontSize={0.05}
          color="#88ddff"
          anchorX="center"
          anchorY="middle"
        >
          Appuyez sur E
        </Text>
      )}
    </group>
  );
}