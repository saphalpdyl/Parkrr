import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import useRenderer from "@/hooks/useRenderer.ts";
import StatusBar from "@/routes/renderer/components/StatusBar.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useEditor from "@/hooks/useEditor.ts";
import useAuth from "@/hooks/useAuth.ts";

function ParkingSpaceRendererPage() {
  const {
    currentParkingLotId,
    loadParkingLot,
  } = useRenderer();

  const { token } = useAuth();
  const { getAllEditorInformation } = useEditor();

  const navigate = useNavigate();

  useEffect(() => {
    void async function() {
      const hasEditors = (await getAllEditorInformation()).length > 0;

      if ( currentParkingLotId && token ) loadParkingLot(currentParkingLotId);
      else {
        if ( !hasEditors ) navigate("/editor");
      }
    }();
  }, [currentParkingLotId, token]);

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