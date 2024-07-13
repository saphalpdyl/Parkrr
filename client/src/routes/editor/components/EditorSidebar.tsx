import { CircleDotDashed, Eraser, Save } from "lucide-react";
import EditorSidebarButton from "./EditorSidebarButton";
import { useEditorStore } from "../../../stores/editorState";

type EditorSidebarProps = {
  onSave(): void;
  onCenterOrigin(): void;
};

const EditorSidebar = ({ onSave, onCenterOrigin }: EditorSidebarProps) => {
  const { deleteAllItems } = useEditorStore();
  
  return (
    <div className="fixed left-0 z-20 flex h-2/7 w-16 flex-col gap-2 items-center rounded-e-xl border-y-2 border-e-2 border-slate-600 bg-gray-100 py-3 shadow-md">
      <EditorSidebarButton onClick={onSave} icon={Save} title="Save" />
      <EditorSidebarButton
        onClick={deleteAllItems}
        icon={Eraser}
        title="Clear"
        className="bg-rose-500 hover:bg-rose-600"
      />
      <EditorSidebarButton
        onClick={onCenterOrigin}
        icon={CircleDotDashed}
        title="Center Origin"
        className="bg-gray-500 hover:bg-gray-600"
      />
    </div>
  );
};
export default EditorSidebar;
