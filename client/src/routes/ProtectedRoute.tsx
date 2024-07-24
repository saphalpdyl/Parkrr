import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import {useEditorStore} from "@/stores/editorState.ts";

function ProtectedRoute() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { setEditorLoading } = useEditorStore();

  useEffect(() => {
    if ( !token ) {
      navigate("/auth/login");
    }
  }, [token]);

  useEffect(() => {
    if ( token === null ) setEditorLoading(false);
  }, [token]);
  
  return <>
    <Outlet />
    
  </>;
}
export default ProtectedRoute