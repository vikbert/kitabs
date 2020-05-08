import React, {useState, useEffect} from 'react';
import './Todo.less';
import TodoItem from "./TodoItem";
import TodoFactory from "./TodoFactory";
import {Article} from 'react-weui';
import TodoStorage from "../../../helpers/TodoStorage";

const Todo = () => {
    const [newTitle, setNewTitle] = useState('');
    const [todos, setTodos] = useState([]);
    const [open, setOpen] = useState(false);
    const [counter, setCounter] = useState({
        all: 0,
        active: 0,
        completed: 0,
    });

    const updateCounter = (todos) => {
        const all = todos.length;
        const completed = todos.filter((element) => element.completed).length;
        const active = all - completed;
        setCounter({all, active, completed});
    };

    const toggleSlide = (e) => {
        setOpen(!open);
    };

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
        let updatedList = [];
        if (todo.title.length === 0) {
            // if title empty, delete this item
            updatedList = todos.filter((element) => element.id !== todo.id);
        } else {
            // if title set, update this item
            updatedList = todos.map((element) => (element.id === todo.id) ? todo : element);
        }

        setTodos(updatedList);
    };

    useEffect(() => {
        TodoStorage.loadTodos(setTodos);
    }, []);

    useEffect(() => {
        TodoStorage.saveTodos(todos);
        updateCounter(todos);
        setOpen(true);
    }, [todos]);

    return (
        <>
            <div className="todoapp">
                <header className="header">
                    <input
                        type="text"
                        placeholder={'Plan a new thing ...'}
                        value={newTitle}
                        autoFocus={true}
                        onChange={updateStateTitle}
                        onKeyPress={handlePressEnterKey}
                        className="new-todo"
                    />
                </header>
                {todos && (
                    <div className="main main--starred">
                        <input id="toggle-all" type="checkbox" className="toggle-all"/>
                        <label htmlFor="toggle-all"></label>
                        <ul className="todo-list">
                            {todos.filter((item) => item.starred).map((todo) => (
                                <TodoItem
                                    key={todo.id}
                                    item={todo}
                                    updateTodoCallback={(todo) => updateTodoInList(todo)}
                                />
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="slide">
                <Article className="slide__header">
                    <input onChange={toggleSlide}
                           id="toggle-slide"
                           type="checkbox"
                           className="toggle-slide" checked={open}/>
                    <label htmlFor="toggle-slide"
                           className="icon-menu2 icon__medium icon__clickable">
                    </label>
                </Article>
                {todos && open && (
                    <div className="main main--slide">
                        <ul className="todo-list">
                            {todos.filter((item) => !item.starred).map((todo) => (
                                <TodoItem
                                    key={todo.id}
                                    item={todo}
                                    updateTodoCallback={(todo) => updateTodoInList(todo)}
                                />
                            ))}
                        </ul>
                    </div>
                )}
                <Article className="slide__control">
                    <ul className={'filters'}>
                        <li><a href="#/all">{counter.active} Todos left</a></li>
                    </ul>
                    <ul className={'filters'}>
                        <li><a href="#/all">All ({counter.all})</a></li>
                        <li><a href="#/active">Active ({counter.active})</a></li>
                        <li><a href="#/completed">Completed ({counter.completed})</a></li>
                    </ul>
                    <ul className={'filters'}>
                        <li><a href="#/completed">Clean all completed</a></li>
                    </ul>
                </Article>
            </div>
        </>
    );
};

export default Todo;
