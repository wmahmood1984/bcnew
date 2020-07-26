import React, { useState} from 'react';
import Web3 from 'web3';
import { simpleStorageAbi } from './abis';
import '../App.css';
import { IncomeExpenses } from './IncomeExpenses'
import { Header } from './Header';
import Balance from './Balance'
const web3 = new Web3(Web3.givenProvider);

// contract address is provided by Truffle migration
const contractAddr = '0x0269316ff750456cb4b3a05d273a548349fbabaf';
const SimpleContract = new web3.eth.Contract(simpleStorageAbi, contractAddr);




export const TransactionList = ({state}) => {
    
    
     
    
        
     
    


    return (
        <>
            <h3>History</h3>
            <ul className="list">
                {state.map(stat => 
                (<li id={stat.id}>{stat.text} <span>{stat.amount}</span>
    
                    </li>))}
             
      </ul>
      
        </>
    )
}



export const AddTransactions =()=> {
    let [id, setID] = useState(1); 
    const [text, setText] =useState('');
    const [amount, setAmount] =useState(0);
    let [state,setState] = useState([])
    
    
        const handleGet = async () => {
        const result = await SimpleContract.methods.TXget().call();
        setState((previousState)=>([
                  ...previousState,
                  {id: result[0],text:result[1],amount:result[2]}
                ]))
        }
    const onSubmit = (e) => {
      e.preventDefault();

      const newTransaction = {
        id,
        text,
        amount: +amount

        
      }
      const handleSet = async ({id,text,amount}) => {
            
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        const gas = await SimpleContract.methods.TxCreation(id,text,amount)
                            .estimateGas();
        const result = await SimpleContract.methods.TxCreation(id,text,amount).send({
          from: account,
          gas 
        })
        console.log(result);
        setID(++id);
        console.log(id)
        handleGet()
      }
     handleSet(newTransaction); 
    }
    return (
        <>
            <Header></Header>
            <Balance balance = {state}></Balance>
            <IncomeExpenses transactions={state}></IncomeExpenses>
            <TransactionList state={state}></TransactionList>
            <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount"
            >Amount <br />
            (negative - expense, positive - income)</label>
          <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <button className="btn">Add transaction</button>
      </form>
        </>
    )
}