import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import {useEditorStore} from "@/stores/editorState.ts";
import useRenderer from "@/hooks/useRenderer.ts";

function ProtectedRoute() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { setEditorLoading } = useEditorStore();
  const { setRendererLoading } = useRenderer();

  useEffect(() => {
    if ( !token ) {
      navigate("/auth/login");
    }
  }, [token]);

  useEffect(() => {
    if ( token === null ) {
      setEditorLoading(false);
      setRendererLoading(false);
    }
  }, [token]);
  
  return <>
    <Outlet />
    
  </>;
}
export default ProtectedRoute