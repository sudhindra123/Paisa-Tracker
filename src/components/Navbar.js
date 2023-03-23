import "./Navbar.css"

import { Link } from "react-router-dom"
import {useLogout} from "../hooks/uselogout"
import { useAuthcontext } from "../hooks/useauthcontext"
export default function Navbar(){

const{logout} = useLogout()
const {user} = useAuthcontext()

    return(
        <nav className="navbar">
        <ul>
            <li className="title">Paisa Tracker</li>

{!user && (

            <>
            <li> <Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            </>
            ) }

{user && (

<>

<li>hello,{user.displayName}</li>
            <li>
                <button className="btn" onClick={logout}>Logout</button>
            </li>
            </>
            )}
        </ul>

        </nav>
    )
}