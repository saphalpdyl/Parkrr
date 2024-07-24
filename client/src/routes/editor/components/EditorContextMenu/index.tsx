import { RotateCcwIcon, RotateCwIcon, Trash2 } from "lucide-react";
import { useEditorStore } from "@/stores/editorStore.ts";
import EditorContextMenuButton from "./EditorContextMenuButton";
import { useRotation } from "../../hooks/useRotation";

const EditorContextMenu = () => {
  const { deleteItem, selectedItem, items } = useEditorStore();
  const { rotateItem } = useRotation();

  if ( !selectedItem ) return null;
  
  return (
    <div
      style={{
        top: `calc(${selectedItem.item.position?.z || 0}px - 5rem - 0.5rem)`,
        left: selectedItem.item.position?.x || 0,
      }}
      className="absolute z-30 h-30 w-40 rounded-lg bg-white/30 p-2 text-xs shadow-md flex flex-col"
    >
      <div className="borde-gray-600 mb-2 flex justify-between border-b-2 pb-2">
        <span className="font-bold capitalize">
          {selectedItem.item.category}
        </span>
        <span className="text-[9px] font-light">
          X:{" "}
          {
            items.filter((item) => item.id === selectedItem.item.id)[0].position
              ?.x
          }{" "}
          | Y :
          {
            items.filter((item) => item.id === selectedItem.item.id)[0].position
              ?.z
          }
        </span>
      </div>
      
      <div className="flex flex-1 items-center gap-1 mt-2">
        <EditorContextMenuButton 
          icon={RotateCwIcon}
          onClick={() => rotateItem(selectedItem.item.id, "cw")}
          twColor="bg-blue-500"
          tooltipTitle="Rotate CW"
        />
        <EditorContextMenuButton 
          icon={RotateCcwIcon}
          onClick={() => rotateItem(selectedItem.item.id, "ccw")}
          twColor="bg-blue-500"
          tooltipTitle="Rotate CCW"
        />
        <EditorContextMenuButton 
          icon={Trash2}
          onClick={() => deleteItem(selectedItem.item.id)}
          twColor="bg-red-500"
          tooltipTitle="Delete"
        />
      </div>
    </div>
  );
};
export default EditorContextMenu;
