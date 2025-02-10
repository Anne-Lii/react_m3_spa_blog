import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import {useAuth} from "../context/AuthContex";

interface ProtectedRouteProps {
    children: ReactNode
}

//controll if user is authorized
const ProtectedRoute : React.FC<ProtectedRouteProps>= ({children}) => {
    const {user, loading} = useAuth();

    if (loading) {
        return <div>Loading....</div>
    }

    if (!user) {
        return <Navigate to='/login' replace /> //redirect to login if user is not authorized
    }

    return (
        <>
        {children}
        </>
    )
}

export default ProtectedRoute;