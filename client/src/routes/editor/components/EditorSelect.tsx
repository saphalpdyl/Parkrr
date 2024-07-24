import { useEffect, useState } from "react";
import useEditor from "../../../hooks/useEditor";
import { Plus, Trash2 } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import UserProfile from "../../../components/UserProfile";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function EditorSelect() {
  const [editors, setEditors] = useState<{_id: string, name?: string}[]>([]);
  const [editorsLoading, setEditorsLoading] = useState(true);
  const { getAllEditorInformation, currentEditorId, changeEditor, createNewEditor, deleteEditor } = useEditor();
  const { token } = useAuth();

  const handleDeleteEditor = async (id: string) => {
    await deleteEditor(id)
    refreshEditors();
  };
  const handleChangeEditor = (id: string) => changeEditor(id);
  
  async function refreshEditors() {
    const editors = await getAllEditorInformation();
    setEditors(editors);
    setEditorsLoading(false);
  }

  useEffect(() => {
    setEditorsLoading(true);
    if ( token )
      refreshEditors();
  }, [currentEditorId]);
  
  return (
    <div className="
      absolute z-50
      h-[28rem] w-[33rem] 
      bg-white 
      flex flex-col 

      rounded-2xl
      shadow-lg
      p-5
      text-slate-700
    ">
      <div className="flex justify-between">
        <span className="text-3xl font-semibold mb-2">Saved Instances</span>
        <UserProfile menuPosition="bottom" />
      </div>
      <span className="font-light text-sm text-slate-600 mb-4">Load previously saved <strong>Parkr</strong> instances and continue where you left off on planning.</span>
      <div className="border-t-2 mb-4"></div>
      <div className="flex-1 overflow-auto flex flex-col gap-3">
        {
          !editorsLoading && editors.map((editor, index) => (
            <div key={index} onClick={() => handleChangeEditor(editor._id)} className="p-3 bg-slate-100 hover:bg-slate-200 cursor-pointer rounded-lg text-lg font-semibold flex justify-between items-center group">
              <div className="flex gap-1">
                <span className="border-b-[1px] border-slate-400">{ editor?.name || "Untitled" }</span>
                <span className="text-gray-500 font-normal">.edit</span>
              </div>
              <div className="flex justify-end gap-2">
                <div onClick={e => e.stopPropagation()}>
                  <AlertDialog>
                    <AlertDialogTrigger onClick={e => e.stopPropagation()}>
                      <div  className="p-2 hover:bg-gray-300 transition-colors rounded-lg group/trash">
                        <Trash2 size={20} className="text-slate-800/60 transition-colors group-hover/trash:text-rose-500" />
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently remove your parking lot from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-rose-500 hover:bg-rose-600" onClick={() => handleDeleteEditor(editor._id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))
        }
        {
          editorsLoading && Array(4).fill(0).map((_,index) => (
            <div key={index} className="p-3 h-16 animate-pulse border-[1px] border-slate-200 cursor-pointer rounded-lg text-lg font-semibold flex items-center group">
              <div className="w-40 h-6 bg-slate-200 rounded-md"></div>
              <span className="px-2 text-slate-400">.</span>
              <div className="w-20 h-6 bg-slate-200 rounded-md"></div>
              <div className="flex justify-end flex-1">
                <div className="h-6 w-6 rounded-md bg-slate-200"></div>
              </div>
            </div>
          ))
        }

        {
          !editorsLoading && (
            <div onClick={createNewEditor} className="rounded-lg flex items-center justify-center bg-slate-900 text-white py-3 hover:bg-slate-800 cursor-pointer">
              <Plus />
            </div>
          )
        }
      </div>
    </div>
  )
}
export default EditorSelect;