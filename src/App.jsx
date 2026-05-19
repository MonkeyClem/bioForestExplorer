import { Canvas } from "@react-three/fiber";
import "./styles.css";
import Experience from "./game/Experience";

export default function App() {
  return (
    <Canvas camera={{ position: [73, 6.8, 10], fov: 50 }}>
      <Experience />
    </Canvas>
  );
  
}