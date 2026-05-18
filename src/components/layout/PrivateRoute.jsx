import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function PrivateRoute() {
  const { isAuthenticated } = useContext(AuthContext);

  // Se estiver autenticado, renderiza as rotas filhas (<Outlet />)
  // Se não estiver, redireciona para a página de login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}