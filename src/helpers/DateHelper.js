const DateHelper = {};

DateHelper.getCurrentDate = () => {
    const today = new Date();
    return today.toUTCString().substr(0, 16);
};

DateHelper.getCurrentTime = () => {
    const today = new Date();
    return today.toLocaleTimeString().substr(0, 5);
};

export default DateHelper;
