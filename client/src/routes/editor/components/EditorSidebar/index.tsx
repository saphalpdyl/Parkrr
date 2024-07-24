import { CircleDotDashed, Eraser, FolderOpen, Save } from "lucide-react";
import EditorSidebarButton from "./EditorSidebarButton";
import { useEditorStore } from "@/stores/editorStore.ts";
import useEditor from "../../../../hooks/useEditor";

type EditorSidebarProps = {
  onSave(): void;
  onCenterOrigin(): void;
};

const EditorSidebar = ({ onSave, onCenterOrigin }: EditorSidebarProps) => {
  const { deleteAllItems } = useEditorStore();
  const { removeCurrentEditor } = useEditor();
  
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
      <EditorSidebarButton
        onClick={removeCurrentEditor}
        icon={FolderOpen}
        title="Load"
        className="bg-teal-500 hover:bg-teal-600"
      />
    </div>
  );
};
export default EditorSidebar;
