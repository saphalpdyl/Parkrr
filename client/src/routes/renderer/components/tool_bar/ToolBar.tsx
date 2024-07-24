import ToolBarItem from "@/routes/renderer/components/tool_bar/ToolBarItem.tsx";
import { Box } from "lucide-react";
import Logo from "@/components/Logo.tsx";

function ToolBar() {
  return <div className="absolute flex flex-row-reverse gap-2 right-3 top-3 z-20 items-center">
    <Logo sizeInRem={1.5} />
    <ToolBarItem tooltip="Switch to 2D/3D" icon={Box}/>
  </div>
}

export default ToolBar;