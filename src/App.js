import React, { useEffect } from 'react';
import { confirm } from "react-confirm-box";
import './App.css';
// Components
import Card from './components/Card';
import GetRandomNumbers from './components/GetRandomNumbers';
import Stopwatch from './components/Stopwatch';
import Besttime from './components/Besttime';

/*
  todo nicer win notification
  todo finalize design
  todo cleanup code
  todo implement own file templates to code structure
  todo implement randomized images after win to make it more difficult and interesting
  todo implement harder game with images which are more similiar (via API topic function)
*/

export default function App() {


//#region Randomize, select and store selected cards & set remaining counter

  // set up state for selected cards
  const [ selectedCards, setSelectedCards ] = React.useState([]);

  // set up state for points counter
  const [ counter, setCounter ] = React.useState(10);

  // get a array with randomized sequence of numbers from 1 - 10
  const randomNumbersArray = GetRandomNumbers();

  function getSelectedCardNumber(event){
    event.preventDefault();

    // Set new state of points counter
    selectedCards.indexOf(event.target.id) === -1
      ? setCounter(prevState => prevState - 1)
      : setCounter(0);

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
};

  // Win validation 
  if(counter === 0){

    // stop stopwatch 
    setStopwatchRun(false);
    // get time and parse it into type 'number'
    let min = parseInt(document.getElementById("minutes").innerText);
    let sec = parseInt(document.getElementById("seconds").innerText);
    let msec = parseInt(document.getElementById("milliseconds").innerText);        

    // Gratulate user, compare besttime and reset game
    const onClick = async () => { // ! NNNEEED?
      // Wait for the notification
      const winMessage = "";
      localStorage.Language === "de" 
        ? winMessage = `Gratulation, du hats das Spiel in ${min}:${sec}:${msec} gewonnen!`
        : winMessage = `Congratulations, you won the game in ${min}:${sec}:${msec} !`
        await confirm(winMessage);
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
                const bestMessage = "";
                localStorage.Language === "de" 
                  ? bestMessage = `Gratulation, neue Bestzeit!`
                  : bestMessage = `Congratulations, new best-time !`
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
            <div>     
                <h1>Memory-Card-Game</h1>
                <h6>{
                  localStorage.Language === "de"
                    ? "Klicke auf die 10 Bilder so schnell du kannst, klicke aber auf keines 2 mal oder du beginnst von vorne!"
                    : "Click all 10 images as fast as you can, but don't click on any twice or you have to restart!"
                }</h6>
            </div>
            <div className='stats'>
                <div className='header-points'>
                    <p className='points-text'>{localStorage.Language === "de" ? "Noch zu klicken" : "Remaining to click"}:</p>
                    <p className='points-counter'>{counter}</p>
                </div>
                <div className='timeWrapper'>
                    <Stopwatch run={stopwatchRun} reset={stopwatchReset} />
                    <Besttime />
                </div>
            </div>
        </header>

        <main className='cardboard'>
            {randomNumbersArray.map(el =><Card cardNo={el} key={el} handleClick={getSelectedCardNumber} />)}
        </main>

  </div>
  );
};
