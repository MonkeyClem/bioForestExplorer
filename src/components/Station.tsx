import { animated, useSpring } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from 'three'

export function Station() {
  const { scene } = useGLTF("/models/spaceStation.glb");

  return <primitive object={scene} scale={8.5} position={[2.6, 9, 0]} />;
}

useGLTF.preload("/models/spaceStation.glb");

export function Crystal() {
      const { scene } = useGLTF("/models/crystal.glb");
        useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const material = child.material;

        if (material instanceof THREE.MeshStandardMaterial) {
          material.emissive = new THREE.Color("#fc66ff");
          material.emissiveIntensity = 1.5;
        }
      }
    });
  }, [scene]);
  

        return <primitive object={scene} scale={1} position={[40, 0, -10]} />;

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