import { useEffect } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../state/store/store';

function ProtectedRoutes() {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes;
