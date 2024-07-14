import { ChevronDown, ChevronUp, Plus, Settings, UserCircle } from "lucide-react";
import EditorAddbarParkingSpaceList from "./EditorAddbarParkingSpaceList";
import EditorAddbarItem from "./EditorAddbarItem";
import { useEditorStore } from "../../../../stores/editorState";

function EditorAddBar() {
  const { addNewItem, originPosition } = useEditorStore();
  
  function handleAddOffice() {
    addNewItem({
      category: "office",
      position: {...originPosition!, y: 0},
      id: Math.random().toString(36).slice(2),
    });
  }

  function handleAddEntrance() {
    addNewItem({
      category: "entrance",
      position: {...originPosition!, y: 0},
      id: Math.random().toString(36).slice(2),
    });
  }

  function handleAddExit() {
    addNewItem({
      category: "exit",
      position: {...originPosition!, y: 0},
      id: Math.random().toString(36).slice(2),
    });
  }

  
  return (
    <div className="group fixed bottom-0 z-20 flex h-40 lg:w-1/2 w-3/4 items-end">
      <div className="relative flex h-16 w-full translate-y-8 rounded-t-lg bg-white px-6 py-2  shadow-lg transition group-hover:translate-y-0  justify-center border-x-2 border-t-2 border-transparent group-hover:border-slate-700">
        <div className="absolute flex items-center justify-center -translate-y-9 bg-white rounded-full p-3 transition-all opacity-100 group-hover:opacity-0">
          <Plus />
        </div>
        <div className="flex flex-[3] justify-evenly">
          <EditorAddbarParkingSpaceList />
        </div>
        <div className="flex-[3] flex justify-evenly">
          <EditorAddbarItem title="Office" onClick={handleAddOffice}>
            <div className="h-5 w-5 rounded-sm border-[1px] border-dashed border-gray-800 group-hover/baritem:-translate-y-2 translate-y-0 transition-all transform-gpu"></div>
          </EditorAddbarItem>
          <EditorAddbarItem title="Entrance" onClick={handleAddEntrance}>
            <div className="h-5 w-10 rounded-md bg-green-500 group-hover/baritem:-translate-y-2 translate-y-0 transition-all transform-gpu flex justify-center items-center">
              <ChevronDown color="white" size={16}/>
            </div>
          </EditorAddbarItem>
          <EditorAddbarItem title="Exit" onClick={handleAddExit}>
            <div className="h-5 w-10 rounded-md bg-red-500 group-hover/baritem:-translate-y-2 translate-y-0 transition-all transform-gpu flex justify-center items-center">
              <ChevronUp color="white" size={16}/>
            </div>
          </EditorAddbarItem>
        </div> 


        
      </div>
    </div>
  );
}

export default EditorAddBar;
