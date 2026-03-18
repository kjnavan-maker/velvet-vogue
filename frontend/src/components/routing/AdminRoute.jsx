import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminRoute({ children }) {
  const location = useLocation();
  const { authData } = useSelector((state) => state.auth);

  if (!authData?.token) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  if (authData?.user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;