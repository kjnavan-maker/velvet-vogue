import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const { authData } = useSelector((state) => state.auth);

  if (!authData?.token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;