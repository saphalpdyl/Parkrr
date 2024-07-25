import ToolBarItem from "@/routes/renderer/components/tool_bar/ToolBarItem.tsx";
import { Box, Pencil } from "lucide-react";
import Logo from "@/components/Logo.tsx";
import useRenderer from "@/hooks/useRenderer.ts";
import { useNavigate } from "react-router-dom";

import ToolBarReports from "./components/ToolBarReports";

function ToolBar() {
  const { setCameraMode, cameraMode } = useRenderer();
  const navigate = useNavigate();

  function handleToggleCameraMode() {
    if ( cameraMode === "2d" ) setCameraMode("3d");
    else setCameraMode("2d");
  }

  function handleSwitchToEditor() {
    navigate("/editor");
  }

  return <div className="absolute flex flex-row-reverse gap-2 right-3 top-3 z-20 items-center">
    <Logo sizeInRem={1.5} />
    <ToolBarItem tooltip="Switch to 2D/3D" icon={Box} color="rose" onClick={handleToggleCameraMode}/>
    <ToolBarItem tooltip="Switch to editor" icon={Pencil} color="blue" onClick={handleSwitchToEditor}/>
    <ToolBarReports />

  </div>
}

export default ToolBar;
