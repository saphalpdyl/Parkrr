import { v4 as uuid } from "uuid";


import { useEditorStore } from "@/stores/editorStore.ts";
import { itemSizes } from "../../constants";
import EditorAddbarItem from "./EditorAddbarItem";
import { parkingSpacesProperties} from "@/constants";

function EditorAddbarParkingSpaceList() {
  const { addNewItem, originPosition } = useEditorStore();
  
  return (
    <>
      {parkingSpacesProperties.map((item) => (
        <EditorAddbarItem 
          key={item.spaceType}
          onClick={() => {
            addNewItem({
              category: "space",
              spaceType: item.spaceType,
              position: {...originPosition!, y: 0},
              id: uuid(),
              args:[itemSizes["space"].width, 0, itemSizes["space"].height]
            })
          }}
          title={item.spaceType}
        >
          <div
            style={{
              backgroundColor: item.color,
            }}
            className={`h-4 w-4 rounded-full group-hover/baritem:-translate-y-3 translate-y-0 transition-all transform-gpu ${item.border && "border-2 border-black"} ring-2 ring-offset-1 ring-slate-200 group-hover/baritem:ring-transparent`}
          ></div>
        </EditorAddbarItem>
      ))}
    </>
  )
}
export default EditorAddbarParkingSpaceList