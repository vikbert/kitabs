import React from 'react';
import DateHelper from "../../helpers/DateHelper";

const Clock = () => (
    <div className={'clock'}>
        <div className={'time'}>{DateHelper.getCurrentTime()}</div>
        <div className={'date'}>{DateHelper.getCurrentDate()}</div>
    </div>
);

export default Clock;
