import {logTodo} from "./Logger";

const KEY_TODOS = 'kitabs_todos';

const TodoStorage = {};
TodoStorage.saveTodos = (todos) => {
    logTodo('input todos from component', todos);
    chrome.storage.local.set({[KEY_TODOS]: todos}, () => {
        logTodo('Todos are save in storage', todos);
    });
};

TodoStorage.loadTodos = (stateCallback) => {
    chrome.storage.local.get({[KEY_TODOS]: []}, function(result) {
        if (!result) {
            stateCallback([]);
            logTodo('result undefined or empty', result);

            return;
        }

        if (Object.keys(result).length === 0) {
            logTodo('result is empty object', result);
            stateCallback([]);
            return;
        }

        logTodo('result OK, and set todos to react', result);
        stateCallback(result[KEY_TODOS]);
    });
};

export default TodoStorage;
