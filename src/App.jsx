import { Canvas } from "@react-three/fiber";
import "./styles.css";
import Experience from "./game/Experience";

export default function App() {
  return (
    <Canvas camera={{ position: [0, 5.8, 5], fov: 50 }}>
      <Experience />
    </Canvas>
  );
  
}