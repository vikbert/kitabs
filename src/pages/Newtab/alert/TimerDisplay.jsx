import React, {useState, useEffect} from 'react';
import {secondsToTime} from "../../../helpers/TimerHelper";

let intervals = [];

const clearAllIntervals = () => {
    intervals.forEach(window.clearInterval);
    intervals = [];
};

const TimerDisplay = ({counterInSeconds}) => {
    const [seconds, setSeconds] = useState(0);

    const reset = () => {
        clearAllIntervals();
        setSeconds(0);
        window.close();
    };

    const countDown = (counterSeconds) => {
        if (counterSeconds === 0) {
            return;
        }

        clearAllIntervals();

        setSeconds(counterSeconds);
        const intervalId = setInterval(() => {
            counterSeconds--;
            setSeconds(counterSeconds);
            if (counterSeconds === 0) {
                reset();
            }
        }, 1000);
        intervals.push(intervalId);
    };

    useEffect(() => {
        countDown(counterInSeconds);
    }, []);

    return (
        <div className="timer-display">
            {secondsToTime(seconds)}
        </div>
    );
};

export default TimerDisplay;
