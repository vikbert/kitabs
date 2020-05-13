export const logPopup = (message, ...others) => {
    console.log('[popup_module]: ' + message, others);
};

export const logBookmarks = (message, ...others) => {
    if (others.length) {
        console.log('[bookmark_module]: ' + message, others);
    } else {
        console.log('[bookmark_module]: ' + message);
    }
};
