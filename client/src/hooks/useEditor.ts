import axios from "axios";
import {itemSizes, SIZE_FACTOR} from "@/routes/editor/constants";
import {EditorItem, ParkingItemCategory} from "@/routes/editor/types";
import {useEditorStore} from "../stores/editorStore.ts";
import {OtherObject, IParkingLot} from "@/types/parking";
import {convertToRadians} from "@/utils";
import toast from "react-hot-toast";
import useGlobalStore from "@/stores/globalStore.ts";

export default function useEditor() {
  const { 
    originPosition,
    items,
    currentEditorId,
    setCurrentEditorId,
    setItems,
    currentEditor,
    setCurrentEditor,
  } = useEditorStore();

  const { startEditorLoading, stopEditorLoading } = useGlobalStore();

  async function loadEditor() {
    startEditorLoading();
    if ( !currentEditorId ) return;

    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/app/lots/${currentEditorId}`);
      const floor = response.data.floors[0];
      const resItems = floor ? [
        ...floor.spaces.map((e:{ editorData: EditorItem}) => e.editorData),
        ...floor.offices.map((e:{ editorData: EditorItem}) => e.editorData),
        ...floor.entrances.map((e:{ editorData: EditorItem}) => e.editorData),
        ...floor.exits.map((e:{ editorData: EditorItem}) => e.editorData),
      ] : [];

      setCurrentEditor({
        name: response.data.name,
      });
      
      setItems(resItems);

      stopEditorLoading();
    } catch(e) {
      setCurrentEditorId(null);
      setCurrentEditor(null);
      localStorage.removeItem("recentEditorId");
    }
  }

  async function changeEditor(id: string) {
    setCurrentEditorId(id);
    localStorage.setItem("recentEditorId", id);
    stopEditorLoading();
  }

  async function renameEditor(newName: string) {
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/app/lots/rename/`, {
      parkingLotId: currentEditorId,
      name: newName,
    });

    changeEditor(response.data._id);
  }

  async function getAllEditorInformation() {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/app/lots/`);
    return response.data as {_id: string, name?: string}[];
  }
  
  async function removeCurrentEditor() {
    startEditorLoading();
    setCurrentEditorId(null);
    setCurrentEditor(null);
  }

  async function createNewEditor() {
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/app/lots/new/`);
    if (response.data._id) setCurrentEditorId(response.data._id);

    return response;
  }

  async function deleteEditor(id: string) {
    // If the current editor is the one being deleted
    if ( id === currentEditorId )
      await removeCurrentEditor();

    toast.loading("Deleting", {id: "delete"});
    await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/v1/app/lots/${id}`);
    toast.success("Deleted", {id: "delete"});
  }

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
            // @ts-ignore
            type: item.spaceType,
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
    const parkingLot: IParkingLot = {
      floors: [
        {
          floorPrefix: "A",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
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

  return { 
    handleSave,
    loadEditor,
    changeEditor,
    currentEditorId,
    getAllEditorInformation,
    removeCurrentEditor,
    currentEditor,
    renameEditor,
    createNewEditor,
    deleteEditor,
  };
}
