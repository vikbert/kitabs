const store = require('store');
const todoStore = {
    key: 'kitabs_todos',
};

todoStore.loadTodos = () => {
    return store.get(todoStore.key, {});
};

todoStore.saveTodos = (todos) => {
    store.set(todoStore.key, todos);
};

export default todoStore;

