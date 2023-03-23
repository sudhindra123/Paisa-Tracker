import { useState,useEffect, useRef } from "react"
import { projectservice } from "../firebase/config"



export const  useCollection = (collection,_query,_orderby)=>{
const [documents,setDocuments] = useState(null)
const [error,setError] = useState(null)

//if we dont use a ref then it will run for an infinite number of times
//_query is an array and is differenton every function call
const query=useRef(_query).current

const orderby = useRef(_orderby).current

useEffect(()=>{
    let ref = projectservice.collection(collection)

if(query){
    ref=ref.where(...query)
}

if(orderby){
    ref=ref.orderBy(...orderby)
}


const unsubscribe = ref.onSnapshot((snapshot)=>{
let results =[]
snapshot.docs.forEach(doc =>{
    results.push({...doc.data(),id:doc.id})
})
//update state
setDocuments(results)
setError(null)
},(error)=>{
    console.log(error)
    setError('could not fetch the data')
})
// unsubscribe on unmount
return () => unsubscribe()

},[collection,query,orderby])



return{documents,error}
}