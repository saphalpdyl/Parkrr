import { Plus } from "lucide-react";
import EditorAddbarParkingSpaceList from "./EditorAddbarParkingSpaceList";

function EditorAddBar() {
  return (
    <div className="group fixed bottom-0 z-20 flex h-40 lg:w-1/2 w-3/4 items-end">
      <div className="relative flex h-16 w-full translate-y-8 rounded-t-lg bg-white px-6 py-2  shadow-lg transition group-hover:translate-y-0  justify-center border-x-2 border-t-2 border-transparent group-hover:border-slate-700">
        <div className="absolute flex items-center justify-center -translate-y-9 bg-white rounded-full p-3 transition-all opacity-100 group-hover:opacity-0">
          <Plus />
        </div>
        <div className="flex flex-[3] justify-evenly">
          <EditorAddbarParkingSpaceList />
        </div>
        <div className="flex-[4]"></div>
      </div>
    </div>
  );
}

export default EditorAddBar;
