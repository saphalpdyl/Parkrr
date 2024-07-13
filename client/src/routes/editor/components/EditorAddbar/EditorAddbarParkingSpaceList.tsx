import { useEditorStore } from "../../../../stores/editorState";
import { ParkingSpaceType } from "../../../../types/parking";
import EditorAddbarItem from "./EditorAddbarItem";

const bottomNavigationBarParkingSpaces: {
  spaceType: ParkingSpaceType;
  color: string;
  border?: boolean;
}[] = [
  {
    spaceType: "standard",
    color: "#fff",
    border: true,
  },
  {
    spaceType: "electric",
    color: "#00917c",
  },
  {
    spaceType: "handicap",
    color: "#1d63dc",
  },
  {
    spaceType: "vip",
    color: "#ab2330",
  },
];

function EditorAddbarParkingSpaceList() {
  const { addNewItem, originPosition } = useEditorStore();
  
  return (
    <>
      {bottomNavigationBarParkingSpaces.map((item) => (
        <EditorAddbarItem 
          key={item.spaceType}
          onClick={() => {
            addNewItem({
              category: "space",
              spaceType: item.spaceType,
              position: {...originPosition!, y: 0},
              id: Math.random().toString(36).slice(2),
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