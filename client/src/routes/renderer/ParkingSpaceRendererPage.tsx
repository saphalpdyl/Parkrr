import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import useRenderer from "@/hooks/useRenderer.ts";
import StatusBar from "@/routes/renderer/components/StatusBar.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ParkingSpaceRendererPage() {
  const {
    currentParkingLotId,
    loadParkingLot,
  } = useRenderer();

  const navigate = useNavigate();

  useEffect(() => {
    if ( currentParkingLotId )  loadParkingLot(currentParkingLotId);
    else navigate("/editor");
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