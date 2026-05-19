interface LightingProps{
    stationPowered: boolean
}

export function Lighting({stationPowered} : LightingProps) {
  return (
    <>
      <ambientLight intensity={stationPowered ? 1.5 : 0.18} color="#e8e8e8" />




      <directionalLight
        position={[8, 12, 6]}
        intensity={0.8}
        color="#8fb8ff"
      />

      <pointLight
        position={[0, 3, 4]}
        intensity={2}
        distance={1.2}
        color="#45e6ff"
      />


         <pointLight
        position={[35,1 , 14]}
        intensity={10}
        distance={10}
        color="#aa1573"
        scale={10}
        
      />


      <pointLight
        position={[0, 3, -14]}
        intensity={1200}
        distance={10}
        color="#7b4dff"
      />
    </>
  );
}