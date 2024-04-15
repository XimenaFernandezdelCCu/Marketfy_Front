import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux"


export default function ProtectedRoute(props) {
    const reduxAuth = useSelector((state) => state.auth.auth);
    const isAuthenticated = reduxAuth;


    return (
        <>
            {isAuthenticated ?
                <>{props.children}</>
                :
                <Navigate to="/auth" replace />
            }
        </>

    );
};
