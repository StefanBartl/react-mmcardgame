import React, { useEffect } from 'react';
import { confirm } from "react-confirm-box";

import './App.css';
import Card from './components/Card';
import GetRandomNumbers from './components/GetRandomNumbers';
import Stopwatch from './components/Stopwatch';

/*
  todo win notification
  todo get images ! 
  todo  help ?
  todo Translate ? 
  todo scoreboard with local storage?
*/

export default function App() {

//#region Randomize, select and store selected cards & set points counter

  // set up state for selected cards
  const [ selectedCards, setSelectedCards ] = React.useState([]);

  // set up state for points counter
  const [ counter, setCounter ] = React.useState(0);

  // get a array with randomized sequence of numbers from 1 - 10
  const randomNumbersArray = GetRandomNumbers();

  function getSelectedCardNumber(event){
    event.preventDefault();

    // Set new state of points counter
    selectedCards.indexOf(event.target.id) === -1
      ? setCounter(prevState => prevState + 1)
      : setCounter(0);

// todo delete this line 

    document.getElementById(event.target.id).classList.add("selected")

      // Set new state of the selected card number collecting array
    setSelectedCards(prevState => {
      let newArr = [];  // define new array
      for(let x = 0; x < prevState.length; x++){ // loop trough previous array...
          newArr.push(prevState[x]); //  ..to push older selected card numbers in new array
      };
      newArr.push(event.target.id); // add the new selected card number to array
      return newArr; // set the new state of the array for selected card numbers
    });
  };

//#endregion


const [stopwatchRun, setStopwatchRun] = React.useState(true);
const [stopwatchReset, setStopwatchReset] = React.useState(false);

      // Win logic 
      if(counter === 3){

        // stop stopwatch 
        setStopwatchRun(false);
        // get time
        let min = document.getElementById("minutes").innerText;
        let sec = document.getElementById("seconds").innerText;
        let msec = document.getElementById("milliseconds").innerText;

        const onClick = async () => {
           const result = await confirm(`Congratulations, you won the game in ${min}${sec}${msec} !`);
           setStopwatchRun(true)
           setStopwatchReset(true)
          };
         onClick();
         setCounter(0);
         setStopwatchReset(false);
        };

  return (
    <div className="App">
        <header className='header'>
            <h1>Memory-Card-Game</h1>
            <div className='header-points'>
                <p className='points-text'>Points: </p>
                <p className='points-counter'>{counter}</p>
            </div>
        </header>
        <main className='cardboard'>
            {randomNumbersArray.map(el =><Card cardNo={el} key={el} handleClick={getSelectedCardNumber} />)}
        </main>
        <footer>
          <Stopwatch run={stopwatchRun} reset={stopwatchReset} />
        </footer>
    </div>
  );
};
