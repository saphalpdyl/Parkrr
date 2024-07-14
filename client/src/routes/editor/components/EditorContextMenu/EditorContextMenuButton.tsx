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
    <div onClick={onClick} className={twMerge("h-6 w-6 rounded-md bg-gray-300 flex items-center justify-center cursor-pointer", twColor)}>
      <Icon size={18} color="white" />
    </div>
  );
}
export default EditorContextMenuButton