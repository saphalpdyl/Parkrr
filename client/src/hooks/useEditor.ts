import { itemSizes, SIZE_FACTOR } from "../routes/editor/constants";
import { EditorItem, ParkingItemCategory } from "../routes/editor/types";
import { useEditorStore } from "../stores/editorState";
import { OtherObject, ParkingLot } from "../types/parking";
import { convertToRadians } from "../utils";

export default function useEditor() {
  const { originPosition, items, currentEditorId, setCurrentEditorId } = useEditorStore();

  function _generateCompatibleDataForOtherObjects(
    items: EditorItem[],
    category: ParkingItemCategory,
  ) {
    let editorItemProps: Partial<
      Partial<EditorItem> & { occupied: boolean }
    > = {};
    if (category === "space") {
      editorItemProps = {
        occupied: false,
        category: "space",
        spaceType: "standard",
      };
    }

    return items
      .filter((item) => item.category === category)
      .map<OtherObject | EditorItem>((item) => {
        const x = ((item?.position?.x ?? 0) - (originPosition?.x ?? 0)) / SIZE_FACTOR;
        const y = ((item?.position?.z ?? 0) - (originPosition?.z ?? 0)) / SIZE_FACTOR;
        const isVerticallyRotated = Math.abs(item.rotation ?? 0) === 90 || Math.abs(item.rotation ?? 0) === 270;


        return {
          id: item.id,
          position: item.position
            ? {
                x: x + (isVerticallyRotated ? itemSizes[category].height : itemSizes[category].width) / 2,
                y: 0,
                z: y + (isVerticallyRotated ? itemSizes[category].width : itemSizes[category].height) / 2,
              }
            : { x: 0, y: 0, z: 0 },
          rotation: convertToRadians(item.rotation ?? 0),
          color: itemSizes[category].color,
          args: [itemSizes[category].width, 0.1, itemSizes[category].height],
          ...editorItemProps,
        };
      });
  }

  function handleSave() {
    const parkingLot: ParkingLot = {
      floors: [
        {
          floorPrefix: "A",
          // @ts-ignore
          spaces: _generateCompatibleDataForOtherObjects(items, "space"),
          entrances: _generateCompatibleDataForOtherObjects(
            items,
            "entrance",
          ) as OtherObject[],
          exits: _generateCompatibleDataForOtherObjects(
            items,
            "exit",
          ) as OtherObject[],
          offices: _generateCompatibleDataForOtherObjects(
            items,
            "office",
          ) as OtherObject[],
        },
      ],
    };

    // Fetching to the backend
  }

  return { handleSave };
}