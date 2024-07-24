import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import useRenderer from "@/hooks/useRenderer.ts";
import StatusBar from "@/routes/renderer/components/StatusBar.tsx";
import { useEffect } from "react";

function ParkingSpaceRendererPage() {
  const {
    currentParkingLotId,
    loadParkingLot,
  } = useRenderer();

  useEffect(() => {
    if ( currentParkingLotId )  loadParkingLot(currentParkingLotId);
  }, [currentParkingLotId]);

  return (
    <div className="h-screen w-screen bg-gray-100">
      <StatusBar />
      <Canvas camera={{
        position: [10,10,10]
      }}>
          <gridHelper args={[500,500, "#000", "#ddd"]} />
          <OrbitControls />
          <pointLight />
      </Canvas>
    </div>
  );
}

export default ParkingSpaceRendererPage;