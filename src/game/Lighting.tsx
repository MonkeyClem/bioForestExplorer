interface LightingProps{
    stationPowered: boolean
}

export function Lighting({stationPowered} : LightingProps) {
  return (
    <>
      <ambientLight intensity={0.18} color="#1b244d" />

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
        position={[0, 3, -14]}
        intensity={1.2}
        distance={10}
        color="#7b4dff"
      />
    </>
  );
}