import "./Signup.css"
import { useState } from "react"
import { useSignup } from "../../hooks/usesignup"


 export default function Signup(){
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [displayName,setDisplayName]= useState('')
// destructuring the objects from usesign up
const{error,ispending,signup} = useSignup()


const handleSubmit= (e) =>{
e.preventDefault();
//console.log(email,password,displayName)
signup(email,password,displayName)

}



    return(
<form className="signup-form" onSubmit={handleSubmit}>
<h2>Signup</h2>
<label>
    <span>Email</span>
    <input type='email' 
    onChange={(e)=>setEmail(e.target.value)}
    value={email}
    />
</label>
<label>
    <span>Password</span>
    <input type='password'
    onChange={(e)=>setPassword(e.target.value)}
    value={password} />
</label>
<label>
    <span>Display Name</span>
    <input type="text" 
    onChange={(e)=>setDisplayName(e.target.value)}
        value={displayName}
    />
</label>


   {!ispending && <button className="btn">Signup</button>}
{ispending && <button className="btn" disabled>Loading</button>}
    {error && <p>{error}</p>}
</form>

    )
 }
