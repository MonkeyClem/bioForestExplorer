
import { Lighting } from "./Lighting";
import { PlayerControls } from "./Camera";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useState } from "react";
import { Scene } from "./Scene";
import { SkyDome } from "../components/SkyDome";

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
      <color attach="background" args={["#1d0d1f"]} />
      <fog attach="fog" args={["#280127", 10, 40]} />


<SkyDome/>


      <Lighting stationPowered={stationPowered}/>
      <Scene  onActivateConsole={() => setStationPowered(true) }
            stationPowered = {stationPowered}  
      />

      <PlayerControls/>
      <PostProcessing />

    </>
  );
}