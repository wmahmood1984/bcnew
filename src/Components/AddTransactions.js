import React, { useState } from 'react';
import Web3 from 'web3';
import { simpleStorageAbi } from './abis';
import '../App.css';


const web3 = new Web3(Web3.givenProvider);

// contract address is provided by Truffle migration
const contractAddr = '0x1708F0FD81295c4088fbd4C952d5D0727f079EB1';
const SimpleContract = new web3.eth.Contract(simpleStorageAbi, contractAddr);
/*const handleGet = async (e) => {
    e.preventDefault();
    const result = await SimpleContract.methods.TXget(1).call();
    setGetNumber(result);
    console.log(result[0]);
    console.log(result[1]);
  }*/

  
  export const AddTransactions =()=> {
    let [id, setID] = useState(0); 
    const [text, setText] =useState('');
    const [amount, setAmount] =useState(0);

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
        
      }
     handleSet(newTransaction); 
    }
    return (
        <>
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



export default AddTransactions;
