import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { simpleStorageAbi } from './abis';
import {Transaction } from './Transaction'; 
import '../App.css';

const web3 = new Web3(Web3.givenProvider);

// contract address is provided by Truffle migration
const contractAddr = '0x1708F0FD81295c4088fbd4C952d5D0727f079EB1';
const SimpleContract = new web3.eth.Contract(simpleStorageAbi, contractAddr);




export const TransactionList = ({}) => {
    let [state,setState] = useState([])
    var i;
    useEffect(()=>{
        const handleGet = async () => {
            await SimpleContract.methods.TXget().call(
                function(err,result){for (i= 0; i<result[0].length; ++i){
                    setState((prevState)=>[
                          ...prevState,
                          {id: result[0][i],text:result[1][i],amount:result[2][i]}
                        ])
                    }}
            );
            }
   
     handleGet();
    },[state])
        
     
    


    return (
        <>
            <h3>History</h3>
            <ul className="list">
                {state.map(stat => 
                (<Transaction key={stat.id} transaction ={stat}/>))}
             
      </ul>
        </>
    )
}



