import uuid from "uuid";

const TodoFactory = new Object();

TodoFactory.create = (newTitle) => ({
    id: uuid.v4(),
    title: newTitle,
    info: null,
    starred: false,
    completed: false,
    editing: false,
});

export default TodoFactory;
