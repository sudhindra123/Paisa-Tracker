import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/usefirestore";

export default function TransactionForm({uid}){

const [name,setName]=useState('')
const [amount,setAmount]=useState('')
const {addDocument,response} = useFirestore('transactions')
const handleChange = (e)=>{
e.preventDefault()
addDocument({
    uid:uid,
    name,
    amount
})
}
// this is to clear up the form after success
useEffect (()=>{
if(response.success){
    setName('')
    setAmount('')
}

},[response.success])


    return(
<>
    <h3>Add a transaction</h3>
    <form onSubmit={handleChange}> 
<label>
    <span>Transaction Name </span>
    <input type="text"
    onChange={(e)=>setName(e.target.value)}
    value={name}
    />
</label>
<label>
    <span>Amount</span>
    <input type="number"
    onChange={(e)=>setAmount(e.target.value)}
    value={amount}
/>
</label>
<button>Add </button>
    </form>
</>

    )
}