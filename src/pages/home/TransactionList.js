import { useFirestore } from '../../hooks/usefirestore'
import './Home.css'

export default function TransactionList ({transactions}){
const{deleteDocument} = useFirestore('transactions')


    return(
     <ul className='transactions'>
{transactions.map((transaction)=>(
    <li key={transaction.id}>
        <p className='name'>
            {transaction.name}
        </p>
        <p className='amount'>{transaction.amount}₹ </p>
        <button onClick={()=> deleteDocument(transaction.id)}>X</button>
    </li>
))}

     </ul>
        
    )
}
