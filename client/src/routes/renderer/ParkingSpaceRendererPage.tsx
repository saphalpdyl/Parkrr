import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import useRenderer from "@/hooks/useRenderer.ts";
import useAuth from "@/hooks/useAuth.ts";
import StatusBar from "@/routes/renderer/components/StatusBar.tsx";

function ParkingSpaceRendererPage() {
  const { currentParkingLot } = useRenderer();
  const { user } = useAuth();

  //TODO: was making auser profile in the top left
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