import { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

type EditorSidebarButtonProps = {
  onClick() : void;
  title: string;
  icon: LucideIcon;
  className ?: string;
}


function EditorSidebarButton({
  onClick,
  title,
  icon: Icon,
  className,
}: EditorSidebarButtonProps) {
  return (
    <div className="flex flex-col gap-1 items-center">
      <div 
        onClick={onClick}
        className={twMerge("p-2 rounded-lg bg-blue-500 cursor-pointer hover:bg-blue-600 active:-translate-y-2 transition-all translate-y-0", className)}>
        <Icon className="text-white" />
      </div>
      <span className="font-light text-xs text-center">{ title }</span>
    </div>
  )
}
export default EditorSidebarButton