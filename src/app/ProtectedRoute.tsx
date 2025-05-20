import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
    children: ReactNode;
}

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const { isAuthenticated, isLoading } = useAuth0();
    const location = useLocation();

    if (isLoading) return null;
    
    if (!isAuthenticated) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    return <>{ children }</>;
}

export default ProtectedRoute;