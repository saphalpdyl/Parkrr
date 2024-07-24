import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

function ProtectedRoute() {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if ( !token ) {
      navigate("/auth/login");
    }
  }, [token]);

  return <>
    <Outlet />
    
  </>;
}
export default ProtectedRoute