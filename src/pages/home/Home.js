import "./Home.css"
import TransactionForm from "./transaction"
import { useAuthcontext } from "../../hooks/useauthcontext"
import {useCollection} from '../../hooks/usecollection'

import TransactionList from "./TransactionList"
export default function Home(){


    const {user} =useAuthcontext()
    const {documents,error} = useCollection('transactions',["uid","==",user.uid],["createdat","desc"])

    return(
        <div className="container">
        <div className="content">
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents}/>}
        </div>
        <div className="sidebar">
            <TransactionForm uid={user.uid}/>
        </div>
           
        </div>
    )
}