import { LucideIcon } from "lucide-react"
import { twMerge } from "tailwind-merge";

interface EditorContextMenuButtonProps {
  icon: LucideIcon;
  tooltipTitle: string;
  twColor: string;
  onClick: () => void;
}

function EditorContextMenuButton({
  icon: Icon,
  tooltipTitle,
  twColor,
  onClick
} : EditorContextMenuButtonProps) {
  return (
    <div onClick={onClick} className={twMerge("h-6 w-6 rounded-md bg-gray-300 flex items-center justify-center cursor-pointer relative group", twColor)}>
      <div className="absolute bottom-0 translate-y-0 opacity-0 h-5 w-16 bg-black/40 text-white font-bold rounded-md flex justify-center items-center group-hover:translate-y-6 group-hover:opacity-100 transition-all pointer-events-none text-[10px]">{ tooltipTitle }</div>
      <Icon size={18} color="white" />
    </div>
  );
}
export default EditorContextMenuButton