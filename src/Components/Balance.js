import React from 'react'


function Balance ({balance}) {
    let transactions = balance;
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((total, num)=> {
        return total + Math.round(num);
      },0);
    return (
        <div>
            <h4>Your Balance</h4>
            <h1>${total}</h1>
        </div>
    )
}

export default Balance;
