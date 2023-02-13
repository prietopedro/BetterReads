import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function ProtectedRoutes() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes;
