import React from 'react';
import {getCurrentDate, getCurrentTime} from "../../helpers/date";

const Clock = () => (
    <div className={'clock'}>
        <div className={'date'}>{getCurrentTime()}</div>
        <div className={'time'}>{getCurrentDate()}</div>
    </div>
);

export default Clock;
