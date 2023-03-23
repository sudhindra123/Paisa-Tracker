import { useEffect, useState } from "react"
import { projectauth } from "../firebase/config"
import { useAuthcontext } from "./useauthcontext";


 export const useLogout = () =>{
const [error,setError] = useState(null)
const [ispending,setIspending] = useState(null)
const{dispatch} = useAuthcontext()

//the below  code is meant for the cleanup  
// the cleanup functions  must be used because it prevents the action when the other state is loading
// for example when the user clicks on sigup and since its an asyn fuction it takes time to load its action
// during this time if the user clicks on login page,it redirects the user to its the login page resulting in an error
  const [iscancelled,setiscancelled] = useState(false)


const logout = async () =>{
    setError(null)
    setIspending(true)
//sign the user out
try{
    await projectauth.signOut()
    //dispatch logout action
    dispatch({type:'LOGOUT'})

if(!iscancelled){


    setIspending(false)
    setError(null)
}
}
catch(err){
    if(!iscancelled){
    console.log(err.message)
    setError(err.message)
    setIspending(false)

}
}

}

//cleanup fuctions
useEffect(()=>{
    return () => setiscancelled(true)
})


return{logout,error,ispending}


}