const TodoFactory = {};

TodoFactory.create = (newTitle) => ({
    id: (new Date()).getTime(),
    title: newTitle,
    info: null,
    starred: false,
    completed: false,
    editing: false,
});

export default TodoFactory;
