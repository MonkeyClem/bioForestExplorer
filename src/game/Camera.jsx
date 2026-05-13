// import { OrbitControls } from "@react-three/drei";

// export function Camera() {
//   return <OrbitControls />;
// }
import { PointerLockControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const keys = {
  forward: false,
  backward: false,
  left: false,
  right: false,
};

export function PlayerControls() {
  const { camera } = useThree();
  const controlsRef = useRef();

  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());

//   const hasInitialized = useRef(false);

// useEffect(() => {
//   if (hasInitialized.current) return;

//   camera.position.set(0, 5.8, 5);
//   hasInitialized.current = true;
// }, [camera]);

  useEffect(() => {
    // camera.position.set(0, 5.8, 5);

    function onKeyDown(event) {
      switch (event.code) {
        case "KeyW":
        case "KeyZ":
        case "ArrowUp":
          keys.forward = true;
          break;
        case "KeyS":
        case "ArrowDown":
          keys.backward = true;
          break;
        case "KeyA":
        case "KeyQ":
        case "ArrowLeft":
          keys.left = true;
          break;
        case "KeyD":
        case "ArrowRight":
          keys.right = true;
          break;
      }
    }

    function onKeyUp(event) {
      switch (event.code) {
        case "KeyW":
        case "KeyZ":
        case "ArrowUp":
          keys.forward = false;
          break;
        case "KeyS":
        case "ArrowDown":
          keys.backward = false;
          break;
        case "KeyA":
        case "KeyQ":
        case "ArrowLeft":
          keys.left = false;
          break;
        case "KeyD":
        case "ArrowRight":
          keys.right = false;
          break;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [camera]);

  useFrame((_, delta) => {
    const speed = 4;

    direction.current.set(0, 0, 0);

    if (keys.forward) direction.current.z -= 1;
    if (keys.backward) direction.current.z += 1;
    if (keys.left) direction.current.x -= 1;
    if (keys.right) direction.current.x += 1;

    direction.current.normalize();

    velocity.current
      .copy(direction.current)
      .multiplyScalar(speed * delta);

    controlsRef.current?.moveRight(velocity.current.x);
    controlsRef.current?.moveForward(-velocity.current.z);
  });

  return <PointerLockControls ref={controlsRef} />;
}