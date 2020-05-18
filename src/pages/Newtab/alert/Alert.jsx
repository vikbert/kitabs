import React, {useState} from 'react';
import useVisible from "../../../hooks/useVisible";
import Dialog from "../../../components/Dialog";
import TimerDisplay from "./TimerDisplay";
import {Msg} from 'react-weui';
import AlertSetting from "./AlertSetting";

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
            <Dialog show={visible} hide={hide}>
                <Msg title={'Countdown'} description={'To stop the count down, just close this tab.'} type={'info'}/>
                <TimerDisplay counterInSeconds={seconds} hidePopup={hide}/>
            </Dialog>
            <div className="alert">
                <AlertSetting startAlert={(minute) => handleOnClickMinuteButton(minute)}/>
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
