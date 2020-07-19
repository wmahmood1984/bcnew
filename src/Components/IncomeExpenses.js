import React from 'react'


export const IncomeExpenses =({transactions}) =>{
  const amounts = transactions.map(transaction => transaction.amount);
  
    const income = amounts.filter((age)=> {
        return age >= 0;
      });
    const uniqueIncome = income.reduce((total, num)=> {
        return total + Math.round(num);
      },0);
          

   const expense = amounts.filter((exp)=> {
    return exp < 0;
  });

  const uniqueExpense = expense.reduce((total, num)=> {
    return total + Math.round(num);
  },0);
  
    return (
        
            <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
    <p className="money plus">{uniqueIncome}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p  className="money minus">{uniqueExpense}</p>
        </div>
      </div>
        
    )
}
