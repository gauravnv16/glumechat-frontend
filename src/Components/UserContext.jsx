import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

export const UserContext = ({ children }) => {
    const [user,setUser] = useState({});
    const [isAuth,setIsAuth] = useState(false);
    
    useEffect(() => {
        const user = window.sessionStorage.getItem("user");
        if(user){
            setUser(JSON.parse(user));
            setIsAuth(true);
        }
    },[])
    
    return (
        <>
            <userContext.Provider value={{user,setUser,isAuth,setIsAuth}}>
                { children }
            </userContext.Provider>
        </>
    )
}

export default UserContext;
