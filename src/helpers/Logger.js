export const logTodo = (message, ...others) => {
    console.log('[todo_module]: ' + message, others);
};

export const logBookmarks = (message, ...others) => {
    console.log('[bookmark_module]: ' + message, others);
};
