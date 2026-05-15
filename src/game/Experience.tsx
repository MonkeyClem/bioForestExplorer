
import { Lighting } from "./Lighting";
import { PlayerControls } from "./Camera";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useState } from "react";
import { Scene } from "./Scene";

export function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.6}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
      />
    </EffectComposer>
  );
}


export default function Experience() {
  
    const [stationPowered, setStationPowered] = useState(false);


  return (
    <>
      <color attach="background" args={["#02040d"]} />
      <fog attach="fog" args={["#05081a", 8, 45]} />




      <Lighting stationPowered={stationPowered}/>
      <Scene  onActivateConsole={() => setStationPowered(true) }
            stationPowered = {stationPowered}  
      />

      <PlayerControls/>
      <PostProcessing />

    </>
  );
}