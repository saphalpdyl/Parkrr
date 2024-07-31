import ToolBarItem from "@/routes/renderer/components/tool_bar/ToolBarItem.tsx";
import { Box, MapPin, Pencil, SplineIcon } from "lucide-react";
import Logo from "@/components/Logo.tsx";
import useRenderer from "@/hooks/useRenderer.ts";
import { useNavigate } from "react-router-dom";

import ToolBarReports from "./components/ToolBarReports";
import ToolBarAboutTheProject from "./components/ToolBarAboutTheProject";
import useRendererStore from "@/stores/rendererStore.ts";
import toast from "react-hot-toast";

function ToolBar() {
  const { setCameraMode, cameraMode, setPinging } = useRenderer();
  const navigate = useNavigate();
  const { showGuidingLines, setShowGuidingLines } = useRendererStore();

  function handleToggleCameraMode() {
    if ( cameraMode === "2d" ) setCameraMode("3d");
    else setCameraMode("2d");
  }

  function handleSwitchToEditor() {
    navigate("/editor");
  }

  function handlePingSpaces() {
    setPinging(true);
  }

  function handleToggleGuidingLines() {
    toast.success(`Entrance/Exit guidelines are now ${!showGuidingLines ? "visible" : "hidden"}`)
    setShowGuidingLines(!showGuidingLines);
  }

  return <div className="absolute flex flex-row-reverse gap-2 right-3 top-3 z-20 items-center">
    <Logo sizeInRem={1.5} />
    <ToolBarAboutTheProject />
    <ToolBarItem tooltip="Switch to editor" icon={Pencil} color="blue" onClick={handleSwitchToEditor}/>
    <ToolBarReports />
    <ToolBarItem tooltip="Switch to 2D/3D" icon={Box} color="rose" onClick={handleToggleCameraMode}/>
    <ToolBarItem tooltip="Ping empty spaces" icon={MapPin} color="orange" onClick={handlePingSpaces}/>
    <ToolBarItem tooltip="Toggle entrace/exit guiding lines" icon={SplineIcon} color="pink" onClick={handleToggleGuidingLines}/>

  </div>
}

export default ToolBar;
