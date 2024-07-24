import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

function AuthorizationRoute() {
  const { token } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if ( token ) {
      navigate("/");
    }
  }, [token]);
  
  return <Outlet />;
}
export default AuthorizationRoute