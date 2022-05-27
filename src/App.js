import React, { useEffect } from 'react';
import { confirm } from "react-confirm-box";

import './App.css';
import Card from './components/Card';
import GetRandomNumbers from './components/GetRandomNumbers';
import Stopwatch from './components/Stopwatch';
import Besttime from './components/Besttime';

/*
  todo after win get new set of images
  todo  instructions
  todo nicer win notification
  todo Translate ? 
  todo finalize design
  todo cleanup code
  todo implement hard game with images which are more similiar (via API topic function)
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

//#region Images / Data API

const [allImages, setAllImages] = React.useState([])

React.useEffect(() => {
  async function fetchData() {
    const res = await fetch("https://api.unsplash.com/photos/?client_id=yFMXUTNpe9ZjDVqNOSQJxC4WiW_hJFdNEviXNlu_Vso")
    const data = await res.json()
    setAllImages(data);
  }
  fetchData();
}, []); 

//#endregion

//#region Stopwatch, Best-Time and Win-Validation

const [stopwatchRun, setStopwatchRun] = React.useState(true);
const [stopwatchReset, setStopwatchReset] = React.useState(false);
const [bestTime, setBesttime] = React.useState([]);

// get local storage stored best-time if exists
if(localStorage.getItem('best-minutes') && bestTime[0] !== parseInt(localStorage.getItem('best-minutes')) && bestTime.length !== 0){
  setBesttime(
    [
      localStorage.getItem('best-minutes'),
      localStorage.getItem('best-seconds'),
      localStorage.getItem('best-milliseconds')
    ]
  )
}

  // Win validation 
  if(counter === 3){

    // stop stopwatch 
    setStopwatchRun(false);
    // get time and parse it into type 'number'
    let min = parseInt(document.getElementById("minutes").innerText);
    let sec = parseInt(document.getElementById("seconds").innerText);
    let msec = parseInt(document.getElementById("milliseconds").innerText);        

    // Gratulate user, compare besttime and reset game
    const onClick = async () => { 
      // Wait for the notification
        const result = await confirm(`Congratulations, you won the game in ${min}:${sec}:${msec} !`);
        setStopwatchReset(true); // Trigger time reset

        function bestVal (){
          // Get type 'number' for comparing times
          let newTime = parseInt(`${min}${sec}${msec}`);
          let oldTime = parseInt(`${bestTime[0]}${bestTime[1]}${bestTime[2]}`);

        if(newTime < oldTime|| bestTime.length === 0){ // check if new time is faster OR first best time
                setBesttime([min, sec, msec]);
                localStorage.setItem('best-minutes', min);
                localStorage.setItem('best-seconds', sec);
                localStorage.setItem('best-milliseconds', msec);
                // alert("New best time!");
            };

        };
        bestVal();

        setStopwatchRun(true); // Start stopwatch again
      };
      onClick(); // Invoke func
      setCounter(0); // Reset counter
      setStopwatchReset(false); // Set reset trigger back to false
  };

//#endregion

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

            {randomNumbersArray.map(el =>
            {let url = "";
              allImages.length !== 0  ? url = allImages[el - 1].urls.regular : url = "";
              return <Card cardNo={el} key={el} url={url} handleClick={getSelectedCardNumber} />
            }
            )}
        </main>

        <footer>
          <Stopwatch run={stopwatchRun} reset={stopwatchReset} />
          <Besttime />
        </footer>

    </div>
  );
};
