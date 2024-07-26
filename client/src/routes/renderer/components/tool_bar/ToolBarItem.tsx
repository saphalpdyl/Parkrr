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
  color: "rose" | "blue" | "teal" | "orange" | "gray" | "slate" | "neutral" | "pink",
  onClick: () => void;
}

const mapColorsToClassNames = {
  "rose": "bg-rose-500",
  "blue": "bg-blue-500",
  "teal": "bg-teal-500",
  "orange": "bg-orange-500",
  "gray": "bg-gray-500",
  "pink": "bg-pink-500",
  "neutral": "bg-neutral-900",
  "slate": "bg-slate-900",
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
          <div onClick={onClick} className={`w-10 h-10 ${mapColorsToClassNames[color]} rounded-lg text-white flex items-center justify-center`}>
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
