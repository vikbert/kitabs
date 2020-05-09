import {logTodo} from "./Logger";

const store = require('store');
const todoStore = {
    key: 'kitabs_todos',
};

todoStore.saveAll = (todos) => {
    store.set(todoStore.key, todos);
};

todoStore.loadAll = () => {
    const orderById = (a, b) => {
        let compared = 0;
        if (b.id > a.id) {
            compared = 1;
        } else if (b.id < a.id) {
            compared = -1;
        }

        return compared;
    };

    const todos = store.get(todoStore.key, []);
    logTodo('load todos from local storage', todos);

    return todos.sort(orderById);
};

todoStore.removeAll = () => {
    return store.remove(todoStore.key);
};

// TODO: switch array => object

todoStore.loadTodos = () => {
    return store.get(todoStore.key, {});
};

todoStore.saveTodos = (todos) => {
    store.set(todoStore.key, todos);
};

export default todoStore;

