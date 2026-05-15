import { animated, useSpring } from "@react-spring/three";
import { useFrame } from "@react-three/fiber";
import type { ThreeElements } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type AlienPlantProps = {
    stationPowered : boolean
}&ThreeElements["group"];

export function AlienPlant(props: AlienPlantProps) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.elapsedTime;

    ref.current.rotation.z =
      Math.sin(t * 0.35) * 0.04;

    ref.current.rotation.x =
      Math.cos(t * 0.2) * 0.015;
  });


    const { scale, emissiveIntensity} = useSpring({
    scale: props.stationPowered ? 2.5 : 0,
    emissiveIntensity: props.stationPowered ? 3 : 0.4,
    config: { mass: 2, tension: 80, friction: 30 },
            delay: props.stationPowered ? 1000 : 0,

  });


  
    const {stemY, stemScale} = useSpring({
      config: { mass: 2, tension: 80, friction: 30 },
      stemScale:  props.stationPowered ? 1 : 0.1,
      stemY:  props.stationPowered ? 1.5 : 0.1,

  });



  
  return <> 
    <group ref={ref} {...props}>
      {/* Tige principale */}
      <animated.mesh
        position-y={stemY}
        scale-y={stemY}
      >        
      <cylinderGeometry args={[0.15, 0.35, 5, 6]} scale={stemScale} />
        <meshStandardMaterial
          color="#7c1fc8"
          emissive="#54108b"
          emissiveIntensity={0.15}
        />
      </animated.mesh>

      {/* Tête organique glow */}
      {/* <mesh position={[0, 5.2, 0]}>
        <icosahedronGeometry args={[0.9, 0]} />

        <meshStandardMaterial
          color="#66ffee"
          emissive="#66ffee"
          emissiveIntensity={4}
        />
      </mesh> */}

    <animated.mesh scale={scale} position={[0, 5.2, 0]}>
      <icosahedronGeometry args={[0.5, 0]} />

      <animated.meshStandardMaterial
        color="#66ffee"
        emissive="#ff66e5"
        emissiveIntensity={emissiveIntensity}
      />
    </animated.mesh>
      {/* Glow local */}
      <pointLight
        position={[0, 5.2, 0]}
        color="#720765"
        intensity={1.5}
        distance={8}
      />
    </group>


    <group ref={ref}   position={[42, 0, -9]}
>
      {/* Tige principale */}
      <animated.mesh
        position-y={stemY}
        scale-y={stemY}
      >        
      <cylinderGeometry args={[0.15, 0.35, 5, 6]} scale={stemScale} />
        <meshStandardMaterial
          color="#7c1fc8"
          emissive="#54108b"
          emissiveIntensity={0.15}
        />
      </animated.mesh>

      {/* Tête organique glow */}
      {/* <mesh position={[0, 5.2, 0]}>
        <icosahedronGeometry args={[0.9, 0]} />

        <meshStandardMaterial
          color="#66ffee"
          emissive="#66ffee"
          emissiveIntensity={4}
        />
      </mesh> */}

    <animated.mesh scale={scale} position={[0, 5.2, 0]}>
      <icosahedronGeometry args={[0.5, 0]} />

      <animated.meshStandardMaterial
        color="#ff66f5"
        emissive="#ff66d9"
        emissiveIntensity={emissiveIntensity}
      />
    </animated.mesh>
      {/* Glow local */}
      <pointLight
        position={[0, 5.2, 0]}
        color="#69075f"
        intensity={1.5}
        distance={8}
      />
    </group>
    </>
  
}