export const logTodo = (message, ...others) => {
    console.log('[todo_module]: ' + message, others);
};

export const logBookmarks = (message, ...others) => {
    if (others.length) {
        console.log('[bookmark_module]: ' + message, others);
    } else {
        console.log('[bookmark_module]: ' + message);
    }
};
