import React, {useState, useEffect} from 'react';
import {secondsToTime} from "../../../helpers/TimerHelper";
import {speak} from "../../../helpers/Notification";

let intervals = [];

const clearAllIntervals = () => {
    intervals.forEach(window.clearInterval);
    intervals = [];
};

const notificationByDuration = (minutes) => {
    if (minutes === 25) {
        return 'Zeit ist um, mache bitte eine kleine Pause für ein gesundes Rücken.';
    }

    return 'Zeit ist um';
};

const TimerDisplay = ({counterInSeconds, hidePopup}) => {
    const [seconds, setSeconds] = useState(0);

    const reset = () => {
        setSeconds(0);
        clearAllIntervals();
        speak(notificationByDuration(counterInSeconds / 60));
        hidePopup();
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
            window.document.title = secondsToTime(counterSeconds);
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
