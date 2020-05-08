import {logTodo} from "./Logger";

const store = require('store');

const KEY_TODOS = 'kitabs_todos';

const TodoStore = {};
TodoStore.saveAll = (todos) => {
    store.set(KEY_TODOS, todos);
};

TodoStore.loadAll = () => {
    logTodo('load todos from local storage');
    return store.get(KEY_TODOS, []);
};

TodoStore.removeAll = () => {
    return store.remove(KEY_TODOS);
};

export default TodoStore;

