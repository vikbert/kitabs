export const speak = (message) => {
    chrome.runtime.sendMessage({
        tts: true,
        message,
    });
};
