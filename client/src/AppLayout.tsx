import { Outlet } from "react-router-dom"
import applicationLogo from "/logo_main_t.png";
import useAuth from "./hooks/useAuth";
import useEditor from "./hooks/useEditor";
import useRenderer from "@/hooks/useRenderer.ts";
import { useEditorStore } from "@/stores/editorState.ts";
import { useEffect } from "react";

function AppLayout() {
  const { loading: authLoading, token } = useAuth();
  const { editorLoading } = useEditor();
  const { rendererLoading, setRendererLoading } = useRenderer();
  const { setEditorLoading } = useEditorStore();

  useEffect(() => {
    if ( token === null ) {
      setEditorLoading(false);
      setRendererLoading(false);
    }
  }, [token]);
  
  return <>
    <Outlet />
    <div className={`
      h-screen w-screen z-40 absolute left-0 top-0 backdrop-blur-md flex flex-col items-center justify-center transition-all
        ${authLoading || editorLoading || rendererLoading ? "pointer-events-auto" : "pointer-events-none"}
        ${authLoading || editorLoading || rendererLoading ? "opacity-100" : "opacity-0"}
      `}>
      <img src={applicationLogo} alt="Loading Application Logo" className="opacity-75 h-40 mb-16"/>
      <span className="font-poppins text-2xl animate-pulse">Loading your instance</span>
      <span className="text-xs text-neutral-600">The authentication process is going on.</span>
    </div>
  </>
}
export default AppLayout