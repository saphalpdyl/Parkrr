import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

function ProtectedRoute({ }: ProtectedRouteProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if ( !user ) {
      navigate("/login");
    }
  }, [user]);
  
  return <Outlet />;
}
export default ProtectedRoute