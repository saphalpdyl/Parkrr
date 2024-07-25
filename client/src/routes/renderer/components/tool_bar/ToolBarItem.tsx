import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { LucideIcon } from "lucide-react";

interface ToolBarItemProps {
  tooltip: string;
  icon: LucideIcon,
  color: "rose" | "blue" | "teal" | "orange" | "gray",
  onClick: () => void;
}

function ToolBarItem({
  tooltip,
  icon: Icon,
  color,
  onClick,
}: ToolBarItemProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger >
          <div onClick={onClick} className={`w-10 h-10 bg-${color}-500 rounded-lg text-white flex items-center justify-center`}>
            <Icon size={20} />
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-slate-900 text-white font-semibold rounded-lg border-none shadow-lg">
          <p>{ tooltip }</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ToolBarItem;
