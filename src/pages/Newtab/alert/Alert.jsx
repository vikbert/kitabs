import React, {useState} from 'react';
import useVisible from "../../../hooks/useVisible";
import Popup from "../../../containers/Popup";
import TimerDisplay from "./TimerDisplay";

const OPTIONS = [5, 10, 15, 25];
const Alert = () => {
    const [duration, setDuration] = useState(3);
    const {visible, show} = useVisible();

    const handleOnClick = (event, value) => {
        setDuration(value);
        show();
    };

    return (
        <>
            <Popup show={visible}>
                <TimerDisplay counterInSeconds={duration}/>
            </Popup>
            {OPTIONS.map((option) => (
                <div key={option} className={'button-alert'}
                     onClick={(event, value) => handleOnClick(event, option)}>
                    <span className="icon icon-alarm"/>
                    <span>{`${option}m`}</span>
                </div>
            ))}
        </>
    );
};

export default Alert;
