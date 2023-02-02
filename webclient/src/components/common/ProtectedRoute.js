import useAuth from "../../api/useAuth";
import { Outlet, Navigate } from "react-router-dom";


export default function ProtectedRoutes() {
  const isAuth = useAuth();
  return isAuth != null ? <Outlet /> : <Navigate to="/" />
}
