export const getCurrentDate = () => {
    const today = new Date();
    return today.toUTCString().substr(0, 16);
};

export const getCurrentTime = () => {
    const today = new Date();
    return today.toLocaleTimeString().substr(0, 5);
};
