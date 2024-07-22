import { Check, X } from "lucide-react";
import useEditor from "../../../hooks/useEditor"
import { useEffect, useState } from "react";

function EditorNameBar() {
  const [ editorName, setEditorName ] = useState<string | null>(null);
  
  const { currentEditor } = useEditor();

  useEffect(() => {
    if ( currentEditor ) setEditorName(currentEditor.name || null);
  }, [currentEditor])
  
  if ( !currentEditor ) return null;
  
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 focus-within:w-80 h-10 bg-white rounded-b-md shadow-md flex justify-center items-center gap-3 z-50 transition-all overflow-hidden">
      <input 
        value={editorName ?? "Untitled"}
        onChange={e => setEditorName(e.target.value)}
        type="text" 
        className="peer bg-transparent outline-none text-blue-500 font-semibold text-lg text-center max-w-48 w-auto"/>
      <span className="font-bold text-gray-400">.edit</span>
      <div className="flex gap-1 text-slate-800 peer-focus:opacity-100 opacity-0 peer-focus:scale-100 scale-0 transition-all cursor-pointer">
        <Check className="hover:text-blue-500 transition-all" />
        <X onClick={() => setEditorName(currentEditor?.name ?? "Untitled")} className="hover:text-red-500 transition-all" />
      </div>
    </div>
  );
}
export default EditorNameBar