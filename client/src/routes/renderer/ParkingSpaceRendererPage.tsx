import { Canvas } from "@react-three/fiber";
import { MapControls, OrbitControls } from "@react-three/drei";
import useRenderer from "@/hooks/useRenderer.ts";
import StatusBar from "@/routes/renderer/components/StatusBar.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useEditor from "@/hooks/useEditor.ts";
import useAuth from "@/hooks/useAuth.ts";
import ParkingSpace from "@/routes/renderer/components/models/ParkingSpace.tsx";

function ParkingSpaceRendererPage() {
  const {
    currentParkingLotId,
    loadParkingLot,
    currentParkingLot,
  } = useRenderer();

  const { token } = useAuth();
  const { getAllEditorInformation } = useEditor();

  const navigate = useNavigate();

  useEffect(() => {
    if ( !token ) return;

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
        position: [0,10,0]
      }}>
          <gridHelper args={[500,500, "#ddd", "#eee"]} />
          {/*<OrbitControls minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2.25}/>*/}
          <MapControls />
          <pointLight position={[0,10,0]} intensity={300} />
          <ambientLight intensity={2} />
        {
          currentParkingLot && (
            <>
              {
                ...currentParkingLot.floors[0].spaces.map(space => (
                  <ParkingSpace position={space.position} rotation={space.rotation} spaceType={space.type} id={space.id} args={space.args} occupied={space.occupied} />
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