import { useState,useEffect } from "react";
import { projectauth } from "../firebase/config";
import { useAuthcontext } from "./useauthcontext";

export const useSignup = () =>{
const [error,setError] = useState(null)
const [ispending,setIspending] = useState(false)
const{dispatch} = useAuthcontext()

const [iscancelled,setiscancelled] = useState(false)


const signup = async (email,passsword,displayName)=>{ // this makes sure that only after thr user has filled the details it invkoes the function rather as invoking automatically


    setError(null) // we do this because wheneever we get some error like password not long enough or incorrect password thrn again we try to submit with new details,so at that moment we try to enter fresh details so we set the error to null initially at the beginning
    setIspending(true)
    try{
        //signing up
    const res=  await  projectauth.createUserWithEmailAndPassword(email,passsword)


    // if any error is there then it will be caught by catch block ,the below code is to tackle poor network connection,etc....
    if(!res){
        throw new  Error('couldnt sign up')
    }
// adding display anme

await res.user.updateProfile({displayName:displayName})

//dispatch login action
dispatch({type :'LOGIN',payload:res.user})



if(!iscancelled){


    setIspending(false)
    setError(null)
}


    }
    catch(err){
//alert(err.message)
if(!iscancelled){
    console.log(err.message)
    setError(err.message)
    setIspending(false)

}
    }
}
useEffect(()=>{
    return () => setiscancelled(true)
})

return {error,ispending,signup}

}