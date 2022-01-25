import React, { useState, useEffect } from 'react';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


function App() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimeOn] = useState(false);


  // Set time on
  useEffect(() => {
    const unsubscribe = new Subject();
    const observable = interval(1000)
        .pipe(takeUntil(unsubscribe))
        .subscribe(() => {
          if (timerOn) {
            setTime((el) => el + 1);
          }
        });

    return () => {
      unsubscribe.next();
      unsubscribe.complete();
    };
  }, [timerOn]);

  function Time({ time }) {
    const format = el => `0${Math.floor(el)}`.slice(-2) //format each el in timer (00:00:00)
    const h = time / 3600
    const min = (time % 3600) / 60

    return (
        <div className='time'>
          {[h, min, time % 60].map(format).join(':')}
        </div>
    )
  }


  return (
      <div className="container" >
          <div>
            <Time time={time} />
          </div>
          <div>
            {!timerOn && time === 0 && (
                <button className='btn btn-primary btn-lg'
                    onClick={() => setTimeOn(true)}
                >
                  Start
                </button>
            )}
            {(time || timerOn) && (
                <button className='btn btn-primary btn-lg'
                    onClick={function () {
                      setTimeOn(false);
                      setTime(0);
                    }}
                >
                  Stop
                </button>
            )}
            {(time || timerOn) &&  (
                <button className='btn btn-primary btn-lg'
                    onDoubleClick={function doubleClick() {
                      setTimeOn(false)
                    }}
                    onClick={function() {
                      if(time > 0) {
                        setTimeOn(true)
                      }
                    }}
                >
                  {timerOn ? "Wait" : "Start"}
                </button>
            )}
            {(time || timerOn)  && (
                <button className='btn btn-primary btn-lg' onClick={() => setTime(0)}
                        >
                  Reset
                </button>
            )}
          </div>
      </div>
  );
}

export default App;
