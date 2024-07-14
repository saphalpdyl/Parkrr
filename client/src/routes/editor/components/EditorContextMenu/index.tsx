import { RotateCwIcon, Trash2 } from "lucide-react";
import IncrementButton from "../../../../components/IncrementButton";
import { useEditorStore } from "../../../../stores/editorState";
import { SIZE_FACTOR } from "../../constants";
import type { EditorItem, Position } from "../../types";
import EditorContextMenuButton from "./EditorContextMenuButton";

interface EditorContextMenuProps {
  selectedItem: {
    item: EditorItem;
    clickPosition: Position;
  };
  items: EditorItem[];
  setItems(items: EditorItem[]): void;
}

const EditorContextMenu = ({
  selectedItem,
  items,
  setItems,
}: EditorContextMenuProps) => {
  const { toggleRotation, deleteItem } = useEditorStore();

  function generateNewPositionedList(
    targetId: string,
    direction: "increase" | "decrease",
    axis: "x" | "z",
  ) {
    const _getNewItem = (item: EditorItem) => ({
      ...item,
      position: {
        y: 0,
        z:
          (item.position?.z || 0) +
          SIZE_FACTOR *
            (axis === "z" ? (direction === "increase" ? 1 : -1) : 0),
        x:
          (item.position?.x || 0) +
          SIZE_FACTOR *
            (axis === "x" ? (direction === "increase" ? 1 : -1) : 0),
      },
    });

    return items.map((item) =>
      item.id === targetId ? _getNewItem(item) : item,
    );
  }

  return (
    <div
      style={{
        top: `calc(${selectedItem.item.position?.z || 0}px - 7rem - 0.5rem)`,
        left: selectedItem.item.position?.x || 0,
      }}
      className="absolute z-30 h-28 w-40 rounded-lg bg-white/30 p-2 text-xs shadow-md flex flex-col"
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
      <div className="flex justify-between">
        <div className="flex flex-1 items-center justify-around">
          <span className="text-lg font-bold">X</span>
          <div className="flex flex-col">
            <IncrementButton
              onClick={() => {
                setItems(
                  generateNewPositionedList(
                    selectedItem.item.id,
                    "increase",
                    "x",
                  ),
                );
              }}
            />
            <IncrementButton
              down
              onClick={() => {
                setItems(
                  generateNewPositionedList(
                    selectedItem.item.id,
                    "decrease",
                    "x",
                  ),
                );
              }}
            />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-around">
          <span className="text-lg font-bold">Y</span>
          <div className="flex flex-col">
            <IncrementButton
              onClick={() => {
                setItems(
                  generateNewPositionedList(
                    selectedItem.item.id,
                    "decrease", //  Decrease for this axis means up
                    "z",
                  ),
                );
              }}
            />
            <IncrementButton
              down
              onClick={() => {
                setItems(
                  generateNewPositionedList(
                    selectedItem.item.id,
                    "increase",
                    "z",
                  ),
                );
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center gap-1 mt-2">
        <EditorContextMenuButton 
          icon={RotateCwIcon}
          onClick={() => toggleRotation(selectedItem.item.id)}
          twColor="bg-blue-500"
          tooltipTitle="Rotate"
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
