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
import useGlobalStore from "@/stores/globalStore.ts";
import { Selection, EffectComposer, Outline } from "@react-three/postprocessing";
import useHover from "@/routes/renderer/hooks/useHover.ts";
import HoveringObjectInfoCard from "@/routes/renderer/components/HoveringObjectInfoCard.tsx";
import HoveringArc from "@/routes/renderer/components/HoveringArc.tsx";
import useSelect from "@/routes/renderer/hooks/useSelect.ts";
import SelectedComponentInfoCard from "./components/SelectedComponentInfoCard";
import toast from "react-hot-toast";
import axios from "axios";

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
  const { hovering, setHovering } = useHover();
  const { setSelectedObject, clearSelectedObject, selectedObject } = useSelect();

  const { startRendererLoading, stopRendererLoading } = useGlobalStore();

  useEffect(() => {
    void async function() {
      // Fetching to the backend
      if ( currentParkingLot == null || currentParkingLot._id == null ) return;

      toast.loading("Saving", {id: "save"})
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/app/lots/update/`, {
        updatedParkingLot: currentParkingLot,
        parkingLotId: currentParkingLot!._id,
      });
      toast.success("Saved", {id: "save"})
    }();
  }, [currentParkingLot])

  useEffect(() => {
    if ( !currentParkingLot ) startRendererLoading();
    else stopRendererLoading();
  }, [currentParkingLot]);

  useEffect(() => {
    if ( !token ) return;

    void async function() {
      const hasEditors = (await getAllEditorInformation()).length > 0;

      if ( currentParkingLotId && token ) loadParkingLot(currentParkingLotId);
      else if ( !hasEditors ) navigate("/editor");
    }();
  }, [currentParkingLotId, token]);


  function handleEmptyAreaClicked() {
    clearSelectedObject();
  }

  return (
    <div className="h-screen w-screen bg-gray-100">
      <StatusBar />
      <ToolBar />
      <HoveringObjectInfoCard />
      { selectedObject && <SelectedComponentInfoCard /> }

      
      <Canvas
        camera={{
          position: [0,30,0]
        }}
        onPointerMissed={handleEmptyAreaClicked}
      >
        <HoveringArc />
        {/* <gridHelper args={[500,500, "#ddd", "#eee"]} /> */}
        <CameraController cameraMode={cameraMode} />
        {
          cameraMode === "3d" ?
            <OrbitControls minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2.25}/>
          : <MapControls enablePan enableRotate={false} />
        }
        <pointLight position={[0,10,0]} intensity={300} />
        <ambientLight intensity={2} />
        <Selection>
          <EffectComposer autoClear={false}>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            <Outline blur edgeStrength={800} width={2000} visibleEdgeColor="green" />
          </EffectComposer>
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
                      hovering={!!(hovering && hovering.id == space.id)}
                      selected={!!(selectedObject && selectedObject.id == space.id)}
                      onHoverHandler={() => setHovering(space)}
                      onSelectHandler={() => setSelectedObject(space)}
                    />
                  ))
                }
              </>
            )
          }
        </Selection>
      </Canvas>
    </div>
  );
}

export default ParkingSpaceRendererPage;