import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRolRoute({ rolRoute }) {
    const {user} = useAuth();

    if (user.role.name !== rolRoute) return <Navigate to="/" replace />;
  
    return <Outlet />;
}

export default ProtectedRolRoute