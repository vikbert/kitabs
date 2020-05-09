import {logTodo} from "./Logger";

const store = require('store');
const TodoStore = {
    key: 'kitabs_todos',
};

TodoStore.saveAll = (todos) => {
    store.set(TodoStore.key, todos);
};

TodoStore.loadAll = () => {
    const orderById = (a, b) => {
        let compared = 0;
        if (b.id > a.id) {
            compared = 1;
        } else if (b.id < a.id) {
            compared = -1;
        }

        return compared;
    };

    const todos = store.get(TodoStore.key, []);
    logTodo('load todos from local storage', todos);

    return todos.sort(orderById);
};

TodoStore.removeAll = () => {
    return store.remove(TodoStore.key);
};

export default TodoStore;

