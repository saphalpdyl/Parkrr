import axios from "axios";
import { itemSizes, SIZE_FACTOR } from "../routes/editor/constants";
import { EditorItem, ParkingItemCategory } from "../routes/editor/types";
import { useEditorStore } from "../stores/editorState";
import { OtherObject, ParkingLot } from "../types/parking";
import { convertToRadians } from "../utils";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useAuth from "./useAuth";

export default function useEditor() {
  const { 
    originPosition,
    items,
    currentEditorId,
    setCurrentEditorId,
    setItems,
    editorLoading,
    setEditorLoading,
  } = useEditorStore();

  const { user } = useAuth();

  async function loadEditor() {
    setEditorLoading(true);
    if ( !currentEditorId ) return;

    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/app/lots/${currentEditorId}`);
    const floor = response.data.floors[0];
    const resItems = [
      ...floor.spaces.map((e:{ editorData: EditorItem}) => e.editorData),
      ...floor.offices.map((e:{ editorData: EditorItem}) => e.editorData),
      ...floor.entrances.map((e:{ editorData: EditorItem}) => e.editorData),
      ...floor.exits.map((e:{ editorData: EditorItem}) => e.editorData),
    ];
    
    setItems(resItems);
    setEditorLoading(false);
  }

  async function changeEditor(id: string) {
    setCurrentEditorId(id);
    localStorage.setItem("recentEditorId", id);
    setEditorLoading(false);
  }

  async function getAllEditorInformation() {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/app/lots/`);
    return response.data as {_id: string, name?: string}[];
  }
  async function removeCurrentEditor() {
    setEditorLoading(true);
    localStorage.removeItem("recentEditorId");
    setCurrentEditorId(null);
  }

  useEffect(() => {
    if ( currentEditorId && user ) {
      loadEditor();
    }
  }, [currentEditorId]);
  
  function _generateCompatibleDataForOtherObjects(
    items: EditorItem[],
    category: ParkingItemCategory,
  ) {
    let editorItemProps: Partial<
      Partial<EditorItem> & { occupied: boolean }
    > = {};
    
    // TODO: Since recalculating from exported metrics to editor matrix 
    // will be difficult save an instance of editor matrix in another key
    // for editing or loading purposes
    return items
      .filter((item) => item.category === category)
      .map<OtherObject | EditorItem>((item) => {
        const x = ((item?.position?.x ?? 0) - (originPosition?.x ?? 0)) / SIZE_FACTOR;
        const y = ((item?.position?.z ?? 0) - (originPosition?.z ?? 0)) / SIZE_FACTOR;
        const isVerticallyRotated = Math.abs(item.rotation ?? 0) === 90 || Math.abs(item.rotation ?? 0) === 270;
        
        if (item.category === "space") {
          editorItemProps = {
            occupied: false,
            spaceType: item.spaceType,
          };
        }
        
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
          category: item.category,
          ...editorItemProps,
          editorData: item,
        };
      });
  }

  async function handleSave() {
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
    toast.loading("Saving", {id: "save"})
    await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/app/lots/update/`, {
      updatedParkingLot: parkingLot,
      parkingLotId: parkingLot._id || currentEditorId,
    });
    toast.success("Saved", {id: "save"})
  }

  return { handleSave, loadEditor, editorLoading, changeEditor, currentEditorId, getAllEditorInformation, removeCurrentEditor };
}
