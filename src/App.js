import React from 'react';
import './App.css';
import AddTransactions from './Components/AddTransactions'
import { TransactionList} from './Components/TransactionList'

function App() {
  return (
    <div className="App">
      <TransactionList></TransactionList>
      <AddTransactions></AddTransactions>
      
    </div>
  );
}

export default App;
