import React from 'react';
import { confirm } from "react-confirm-box";
import './App.css';
import Card from './components/Card';
import GetRandomNumbers from './components/GetRandomNumbers';
import Stopwatch from './components/Stopwatch';
import Besttime from './components/Besttime';

/*
! Do this for better coding and user experience
  todo implement own file templates to code structure
  todo own logo !
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


  // ?  Get from user selected card
  function getSelectedCardNumber(event){
    event.preventDefault();

    // Set new state of points counter
    selectedCards.indexOf(event.target.id) === -1
      ? setCounter(prevState => prevState - 1)
      : setCounter(10);

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


//#region Stopwatch, Win-Validation, Best-Time, Best-Time Reset and 

const [stopwatchRun, setStopwatchRun] = React.useState(true);

const [stopwatchReset, setStopwatchReset] = React.useState(false);

const [bestTime, setBesttime] = React.useState([]);


// ? Get local storage stored best-time if exists
if(localStorage.getItem('best-minutes') && bestTime[0] !== parseInt(localStorage.getItem('best-minutes')) && bestTime.length !== 0){
  setBesttime(
    [
      localStorage.getItem('best-minutes'),
      localStorage.getItem('best-seconds'),
      localStorage.getItem('best-milliseconds')
    ]
  )
};

// ? Win validation 
if(counter === 9){

  // stop stopwatch 
  setStopwatchRun(false); // Stopp stopwatch
  // get time and parse it into type 'number'
  let min = parseInt(document.getElementById("minutes").innerText);
  let sec = parseInt(document.getElementById("seconds").innerText);
  let msec = parseInt(document.getElementById("milliseconds").innerText);        

  // Gratulate user, compare besttime and reset game
  const winValidation = async () => {

    // Get type 'number' for comparing times
    let newTime = parseInt(`${min}${sec}${msec}`);
    let oldTime = parseInt(`${bestTime[0]}${bestTime[1]}${bestTime[2]}`);
    let winMessage = "";
    // Check if new time is faster / first best time or normal win
    if(newTime < oldTime|| bestTime.length === 0){ 
          setBesttime([min, sec, msec]);
          localStorage.setItem('best-minutes', min);
          localStorage.setItem('best-seconds', sec);
          localStorage.setItem('best-milliseconds', msec);
          localStorage.Language === "de" 
            ? winMessage = `Gratulation, du hats das Spiel in ${min}:${sec}:${msec} gewonnen UND eine neue Bestzeit erreicht !`
            : winMessage = `Congratulations, you won the game in ${min}:${sec}:${msec} AND its a new best-time !`;
      } else {
        localStorage.Language === "de" 
        ? winMessage = `Gratulation, du hats das Spiel in ${min}:${sec}:${msec} gewonnen! (Aber leider keine Bestzeit, das nächste mal schaffst du es!)`
        : winMessage = `Congratulations, you won the game in ${min}:${sec}:${msec} ! ( But unfortunately no best time, next time you can do it!)`;
      };

      // Wait for the user confirmation 
      await confirm(winMessage);
       setStopwatchReset(true); // Trigger time reset
       setStopwatchRun(true); // Start stopwatch again
    };

    winValidation(); // Invoke func
    setCounter(0); // Reset counter
    setStopwatchReset(false); // Set reset trigger back to false
};

   // ? Best-Time reset in local storage
function timeReset (event){
    event.preventDefault();
    setBesttime([]);
    localStorage.removeItem('best-minutes');
    localStorage.removeItem('best-seconds');
    localStorage.removeItem('best-milliseconds');
};

  // ? Start/Stop 
function startStop (event){
      event.preventDefault();

      // Toggle stopwatch and counter
      stopwatchRun ? setStopwatchRun(false) : setStopwatchRun(true);
      if(counter !== 10) setCounter(10);
      stopwatchRun ? setStopwatchReset(false) : setStopwatchReset(true);
  
      // Get all cards in array
      const cardsArray = document.querySelectorAll('.cards-images');
      // if user stops game, images blurred out
      if(stopwatchRun){
        for(let card of cardsArray){
          card.style.pointerEvents = 'none';
          card.style.filter = 'blur(.4rem)';
          card.style.transform = "rotate(180deg )";
        };
      };
      // if user starts game, clean images
      if(!stopwatchRun){
        for(let card of cardsArray){
          card.style.pointerEvents = 'all';
          card.style.filter = 'blur(0rem)';
          card.style.transform = "rotate(0deg )";
        };
      };

};

//#endregion

// ? Start game correctly

React.useEffect(()=>{
  document.querySelector('.startstop-btn').click();
},[])

  return (
   <div className="App">
      
        <header className='header'>
            <div className='main-title-div'>     
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
                    <div className="start-stop-reset">
                        <input type="button" value={stopwatchRun ? "stop" : "start"} className='startstop-btn' onClick={startStop} />
                        <input type="button" value="reset" className='reset-btn' onClick={timeReset} />
                    </div>
                </div>
            </div>
        </header>

        <main className='cardboard'>
            {randomNumbersArray.map(el =><Card cardNo={el} key={el} handleClick={getSelectedCardNumber} />)}
        </main>

  </div>
  );
};
