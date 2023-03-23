// ths file is used to add or remove database collection from firestore


import { useReducer,useEffect,useState } from "react";
import { projectservice,timestamp } from "../firebase/config";

let initialState ={ // this is the initail state
    document:null,
    isPending:false,
    error:null,
    success:null
}


const firestoreReducer =(state,action)=>{
    switch(action.type){

case 'IS_PENDING':
    return{isPending:true,document:null,success:false,error:null}

    case 'ADDED_DOCUMENT':
        return {isPending:false,document:action.payload,success:true,error:null}


        case 'ERROR':
            return{isPending:false,document:null,success:false,error:action.payload}

case 'DELETED_DOCUMENT':
    return {isPending:false,document:null,success:true,error:null}

        default:
            return state
    }
}


export const useFirestore = (collection) =>{

const [response,dispatch] = useReducer(firestoreReducer,initialState)
const [isCancelled,setIscancelled]=useState(false)

//collection ref (storing the objects)
const ref = projectservice.collection(collection)


//only dispatch if not cancelled
const dispatchifnotcancelled = (action)=>{
    if(!isCancelled){
dispatch(action)
    }
}


//adding a new document
// doc which is passed as an argument bassically contains the name and aamount  from the transaction.js
const addDocument = async(doc) => {

dispatch ({type:'IS_PENDING'})

try{
    const createdat = timestamp.fromDate(new Date())
     const addedDocument=await ref.add({...doc,createdat:createdat})
     dispatchifnotcancelled({type:'ADDED-DOCUMENT',payload:addedDocument})
}catch(err){
    dispatchifnotcancelled({type:'ERROR',payload:err.message})
}


}

//deleting

const deleteDocument =async(id)=>{
    dispatch({type:'IS_PENDING'})

    try{
 await ref.doc(id).delete()
dispatchifnotcancelled({type:'DELETED_DOCUMENT'})


    }catch(err){
dispatchifnotcancelled({type:'ERROR',payload:'could not delete'})
    }

}


//cleanup functions
// this function fires once when  the component uses the  uses the hook(usefirestore) firsts mounts the dom

useEffect (()=>{
    return() => setIscancelled(true)
},[])

return {addDocument,deleteDocument,response}

}