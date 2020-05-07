import React, {useState, useEffect} from 'react';
import './Todo.less';
import {saveTodos, loadTodos} from "../../../helpers/chromeStorage";
import TodoItem from "./TodoItem";
import TodoFactory from "./TodoFactory";

const testData = [
    {id: 1, title: 'Extension: complete Todo App', info: '', completed: false, starred: true},
    {id: 2, title: 'Extension: add "batch Tab" feature', info: '', completed: false, starred: true},
    {id: 3, title: 'Typescript: 100codingDays start', info: '', completed: false, starred: true},
];
const Todo = () => {
    const [newTitle, setNewTitle] = useState('');
    const [todos, setTodos] = useState([]);

    const updateStateTitle = (event) => {
        const inputValue = event.target.value;
        setNewTitle(inputValue.trimLeft());
    };

    const handlePressEnterKey = (e) => {
        if (newTitle.length === 0) {
            return;
        }

        if (e.key === 'Enter') {
            setNewTitle('');
            setTodos([...todos, TodoFactory.create(newTitle)]);
        }
    };

    const updateTodoInList = (todo) => {
        const updatedList = todos.map((element) => (element.id === todo.id) ? todo : element);
        setTodos(updatedList);
    };

    useEffect(() => {
        console.log('init load todos');
        loadTodos(setTodos);
    }, []);

    useEffect(() => {
        saveTodos(todos);
    }, [todos]);

    return (
        <section className="todoapp">
            <header className="header">
                <input
                    type="text"
                    placeholder={'New thing to do ...'}
                    value={newTitle}
                    autoFocus={true}
                    onChange={updateStateTitle}
                    onKeyPress={handlePressEnterKey}
                    className="new-todo"/>
            </header>
            {todos && (
                <section className="main">
                    <ul className="todo-list">
                        {todos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                item={todo}
                                updateTodoCallback={(todo) => updateTodoInList(todo)}
                            />
                        ))}
                    </ul>
                </section>
            )}
        </section>
    );
};

export default Todo;
