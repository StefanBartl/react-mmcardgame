import React from 'react';
import './App.css';
import Card from './components/Card';
import GetRandomNumbers from './components/GetRandomNumbers';

export default function App() {
  
  let randomNumbersArray = GetRandomNumbers();

  return (
    <div className="App">
        <h1>React-Memory-Card-Game</h1>
        <main className='cardboard'>
            {randomNumbersArray.map(el =><Card cardNo={el} key={el} />)}
        </main>
    </div>
  );
};
