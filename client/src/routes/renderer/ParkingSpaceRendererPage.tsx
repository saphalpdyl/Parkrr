import { Canvas } from "@react-three/fiber";
import { MapControls, OrbitControls } from "@react-three/drei";
import useRenderer from "@/hooks/useRenderer.ts";
import StatusBar from "@/routes/renderer/components/StatusBar.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useEditor from "@/hooks/useEditor.ts";
import useAuth from "@/hooks/useAuth.ts";
import ParkingSpace from "@/routes/renderer/components/models/ParkingSpace.tsx";
import ToolBar from "@/routes/renderer/components/tool_bar/ToolBar.tsx";
import CameraController from "@/routes/renderer/components/CameraController.tsx";

function ParkingSpaceRendererPage() {
  const navigate = useNavigate();

  const {
    currentParkingLotId,
    loadParkingLot,
    currentParkingLot,
    cameraMode,
    pinging,
  } = useRenderer();

  const { token } = useAuth();
  const { getAllEditorInformation } = useEditor();


  useEffect(() => {
    if ( !token ) return;

    void async function() {
      const hasEditors = (await getAllEditorInformation()).length > 0;

      if ( currentParkingLotId && token ) loadParkingLot(currentParkingLotId);
      else if ( !hasEditors ) navigate("/editor");
    }();
  }, [currentParkingLotId, token]);


  return (
    <div className="h-screen w-screen bg-gray-100">
      <StatusBar />
      <ToolBar />

      <Canvas camera={{
        position: [0,30,0]
      }}>
        <gridHelper args={[500,500, "#ddd", "#eee"]} />
        <CameraController cameraMode={cameraMode} />
        {
          cameraMode === "3d" ?
            <OrbitControls minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2.25}/>
          : <MapControls enablePan enableRotate={false} />
        }
        <pointLight position={[0,10,0]} intensity={300} />
        <ambientLight intensity={2} />
        {
          currentParkingLot && (
            <>
              {
                ...currentParkingLot.floors[0].spaces.map(space => (
                  <ParkingSpace
                    position={space.position}
                    rotation={space.rotation}
                    spaceType={space.type}
                    id={space.id}
                    args={space.args}
                    occupied={space.occupied}
                    pinged={pinging && !space.occupied}
                  />
                ))
              }
            </>
          )
        }
      </Canvas>
    </div>
  );
}

export default ParkingSpaceRendererPage;