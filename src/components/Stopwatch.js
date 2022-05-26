import React from "react";
import './Stopwatch.css';

export default function Stopwatch(props){
    
        const [time, setTime] = React.useState(0);
        const [running, setRunning] = React.useState(false);

    if(props.run === true && running !== true){
        setRunning(true);
    };
    if(props.run === false && running !== false){
      setRunning(false);
    };

    if(props.reset === true && running !== true){
      setTime(0);
  };

    // Stopwatch logic
        React.useEffect(() => {
          let interval;
          if (running) {
            interval = setInterval(() => {
              setTime((prevTime) => prevTime + 10);
            }, 10);
          } else if (!running) {
            clearInterval(interval);
          }
          return () => clearInterval(interval);
        }, [running]);


        return (
          <div className="stopwatch">
            <div className="numbers">
              <span id="minutes">{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
              <span id="seconds">{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
              <span id="milliseconds">{("0" + ((time / 10) % 100)).slice(-2)}</span>
            </div>
            {/* <div className="buttons">
              <button onClick={() => setRunning(true)}>Start</button>
              <button onClick={() => setRunning(false)}>Stop</button>
              <button onClick={() => setTime(0)}>Reset</button>       
            </div> */}
          </div>
        );

};