import  "./Login.css"
import { useState } from "react"
import { useLogin } from "../../hooks/uselogin"



export default function Login(){
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const {login,error,ispending} = useLogin()


const handleSubmit =(e) =>{
e.preventDefault()
login(email,password)
}



return(
      <form className="login-form"   onSubmit={handleSubmit}>
<h2>Login</h2>
<label>
    <span>email</span>
    <input type="email"
    onChange={(e)=>setEmail(e.target.value)}
    value={email} //this is foe two way binding
     />
</label>
<label>
    <span>password</span>
    <input type="password" required 
onChange={(e)=> setPassword(e.target.value)}
value={password}

    />
</label>

 {!ispending &&  <button className="btn">Login</button>}
{ispending && <button className="btn" disabled>loading</button>}
{error && <p>{error}</p>}
</form>
    )
}
