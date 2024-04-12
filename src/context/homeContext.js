import { createContext, useState } from "react";

const HomeContext = createContext();

export function HomeProvider ({children}){
    const [found, setFound] = useState();
    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);
    
    return(
        <HomeContext.Provider value={{found, setFound, page, setPage, data, setData}} >
            {children}
        </HomeContext.Provider>
    )
}

export default HomeProvider;
export {HomeContext};