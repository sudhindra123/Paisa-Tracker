// this is meant for show that you are logged in,logged out etc 

import {  createContext,useEffect,useReducer } from "react";
import { projectauth } from "../firebase/config";

export const Authcontext = createContext()

export const authReducer =(state,action)=>{
    switch(action.type){
case 'LOGIN':
    return {...state,user:action.payload}
case 'LOGOUT':
    return {...state,user:null}
case 'AUTH IS READY':
    return {...state,user:action.payload,authIsReady:true}
    default:
        return state
    }
}

export const Authcontextprovider =({children}) =>{
const [state,dispatch] = useReducer(authReducer,{
    user:null,
    authIsReady:false
})

useEffect(()=>{
 const unsub=projectauth.onAuthStateChanged((user)=>{
dispatch({type:'AUTH IS READY',payload:user})
unsub()
})

},[])



console.log('Authcontext state:' ,state)


    return(
        <Authcontext.Provider value={{...state,dispatch}}>
            {children}
        </Authcontext.Provider>
    )
}
//children will be the <App /> content 