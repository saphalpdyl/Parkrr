import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import useGlobalStore from "@/stores/globalStore.ts";

function AuthorizationRoute() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { stopEditorLoading, stopRendererLoading} = useGlobalStore();

  useEffect(() => {
    stopEditorLoading();
    stopRendererLoading();
  }, []);

  useEffect(() => {
    if ( token ) {
      navigate("/");
    }
  }, [token]);
  
  return <Outlet />;
}
export default AuthorizationRoute