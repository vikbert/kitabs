import React, {useState} from 'react';
import useVisible from "../../../hooks/useVisible";
import Popup from "../../../containers/Popup";
import TimerDisplay from "./TimerDisplay";

const MINUTE_OPTION = [5, 10, 15, 25];
const Alert = () => {
    const [seconds, setSeconds] = useState(5);
    const {visible, show, hide} = useVisible();

    const handleOnClickMinuteButton = (minute) => {
        setSeconds(minute * 60);
        show();
    };

    return (
        <>
            <Popup show={visible}>
                <TimerDisplay counterInSeconds={seconds} hidePopup={hide}/>
            </Popup>
            {MINUTE_OPTION.map((minute) => (
                <div key={minute} className={'button-alert'}
                     onClick={() => handleOnClickMinuteButton(minute)}>
                    <span className="icon icon-alarm"/>
                    <span>{`${minute}"`}</span>
                </div>
            ))}
        </>
    );
};

export default Alert;
