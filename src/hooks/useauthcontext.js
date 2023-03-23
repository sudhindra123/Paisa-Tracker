import { Authcontext } from "../context/authcontext";
import { useContext } from "react";

export const useAuthcontext =() =>{
    const context = useContext(Authcontext)
    if(!context){
        throw Error('useauthcontext must be inside authcontextprovider')

    }
    return context
}