import IncrementButton from "../../../../components/IncrementButton";
import { useEditorStore } from "@/stores/editorStore.ts";
import { SIZE_FACTOR } from "../../constants";
import { EditorItem } from "../../types";

interface SelectedItemPropertiesSectionProps {
  isHidden: boolean;
}

function SelectedItemPropertiesSection({
  isHidden,
}: SelectedItemPropertiesSectionProps) {
  const { selectedItem, setItems, items } = useEditorStore();

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
      className={`rounded-y-lg absolute right-0 z-20 flex h-72 w-52 flex-col gap-3 rounded-l-lg border-y-2 border-l-2 border-slate-600 bg-gray-100 p-3 shadow-md transition-all transform-gpu
        ${isHidden ? "translate-x-52" : "translate-x-0"} 
        ${isHidden ? "opacity-0" : "opacity-100"} 
      `}
    >
      {selectedItem && (
        <>
          <span className="text-2xl font-bold">Properties</span>
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
        </>
      )}
    </div>
  );
}
export default SelectedItemPropertiesSection;
