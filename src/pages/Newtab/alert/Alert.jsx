import React, {useState} from 'react';
import useVisible from "../../../hooks/useVisible";
import Popup from "../../../components/Popup";
import TimerDisplay from "./TimerDisplay";
import {Msg} from 'react-weui';

const MINUTE_OPTION = [5, 10, 25];
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
                <Msg title={'Countdown'} description={'To stop the count down, just close this tab.'} type={'info'}/>
                <TimerDisplay counterInSeconds={seconds} hidePopup={hide}/>
            </Popup>
            <div className="alert">
                <div className="button-alert button-icon">
                    <span className="logo-alert icon-alarm"/>
                </div>
                {MINUTE_OPTION.map((minute) => (
                    <div key={minute} className={'button-alert'}
                         onClick={() => handleOnClickMinuteButton(minute)}>
                        <span>{minute}</span>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Alert;
