const KEY_TODOS = 'kitabs_todos';

const TodoStorage = {};
TodoStorage.saveTodos = (todos) => {
    chrome.storage.local.set({[KEY_TODOS]: todos}, () => {
        console.log('Todos saved in storage:', todos.map((todo) => todo.completed));
    });
};

TodoStorage.loadTodos = (stateCallback) => {
    chrome.storage.local.get(KEY_TODOS, function(result) {
        if (!result) {
            stateCallback([]);
            console.log('result undefined or empty: ', result);

            return;
        }

        if (Object.keys(result).length === 0) {
            console.log('result is empty object: ', result);
            stateCallback([]);
            return;
        }

        console.log('result OK: ', result);
        stateCallback(result[KEY_TODOS]);
    });
};

export default TodoStorage;
