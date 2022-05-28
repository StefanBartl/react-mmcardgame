import React from "react";
import './Besttime.css'

export default function Bestttime(){
    
    let element, minutes, seconds, milliseconds;

    // if there is a best - time stored...
    if(localStorage.getItem('best-minutes')){

        // Get values and test for two digits
        localStorage.getItem('best-minutes').length === 2
                ? minutes = localStorage.getItem('best-minutes') // if it has 2 digits (like 23), take it
                : minutes = `0${localStorage.getItem('best-minutes')}`; // else put a zero before, like 07

        localStorage.getItem('best-seconds').length === 2
        ? seconds = localStorage.getItem('best-seconds')
        : seconds = `0${localStorage.getItem('best-seconds')}`;

        localStorage.getItem('best-milliseconds').length === 2
                ? milliseconds = localStorage.getItem('best-milliseconds')
                : milliseconds = `0${localStorage.getItem('best-milliseconds')}`;
        // put element together 
     element =  <p>{minutes}:{seconds}:{milliseconds}</p>
    } else {
     // if there is no best-time stored....
    element = <p>{localStorage.Language === "de" ? "noch keine Beszeit" : "no current best-time"}</p>
    };
    
    return(          
            <div className='best-time-div'>
                    <h3>{localStorage.Language === "de" ? "Bestzeit" : "Best time:"}</h3>
                    {element}
            </div>
    )
};