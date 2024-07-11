import { Save } from "lucide-react";

type EditorSidebarProps = {
  onSave: () => void;
};

const EditorSidebar = ({
  onSave,
}: EditorSidebarProps) => {
  return (
    <div className="fixed left-0 z-20 h-1/2 w-16 rounded-e-xl bg-gray-100 shadow-md transition-all hover:w-24 border-e-2 border-y-2 border-slate-600 flex flex-col items-center py-3">
      <div className="flex flex-col gap-1 items-center">
        <div 
          onClick={onSave}
          className="p-2 rounded-lg bg-blue-500 cursor-pointer hover:bg-blue-600">
          <Save className="text-white" />
        </div>
        <span className="font-light text-xs">Save</span>
      </div>
    </div>
  );
};
export default EditorSidebar;
