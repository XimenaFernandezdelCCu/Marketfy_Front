import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux"


export default function ProtectedRoute(props) {

    //   const reduxAuth = useSelector((state)=>state.auth.auth);
    const reduxAuth = useSelector((state) => state.auth.auth);
    const isAuthenticated = reduxAuth;
    // const [isAuthenticated, setIsAuthenticated] = useState(false);

    // useEffect(() => {
    //     const localAuth = localStorage.getItem("Marketfy_ActiveUser");
    //     if (localAuth != false) {
    //         setIsAuthenticated(true);
    //     }
    // })


    return (
        // <Route {...rest} render={(props) => (
        //   isAuthenticated
        //     ? <Component {...props} />
        //     : <Navigate to="/land" />
        // )} />
        <>
            {isAuthenticated ?
                <>{props.children}</>
                :
                <Navigate to="/auth" replace />
                // <>naaaaaaaaaaaaaaaaaaaaaaaaav</>

            }
        </>

    );
};
