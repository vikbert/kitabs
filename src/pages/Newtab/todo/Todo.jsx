import React, {useState, useEffect} from 'react';
import './Todo.less';
import TodoItem from "./TodoItem";
import {Article} from 'react-weui';
import TodoFactory from "./TodoFactory";
import TodoStore from "../../../helpers/TodoStore";

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [filter, setFilter] = useState('all');
    const [slideOpen, setSlideOpen] = useState(true);
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

    const toggleSlide = () => {
        setSlideOpen(!slideOpen);
    };

    const handleOnChangeTitle = (event) => {
        const inputValue = event.target.value;
        setNewTitle(inputValue.trimLeft());
    };

    const __saveTodosInStateAndStore = (updatedList) => {
        setTodos(updatedList);
        updateCounter(updatedList);
        TodoStore.saveAll(updatedList);
    };

    const insertNewTodo = (e) => {
        if (e.key !== 'Enter') {
            return null;
        }

        if (newTitle.length === 0) {
            return null;
        }

        setNewTitle('');

        const updatedList = [...todos, TodoFactory.create(newTitle)];
        __saveTodosInStateAndStore(updatedList);
    };

    const updateTodoCallback = (todo) => {
        let updatedList = [];
        if (todo.title.length === 0) {
            // if title empty, delete this item
            updatedList = todos.filter((element) => element.id !== todo.id);
        } else {
            // if title set, update this item
            updatedList = todos.map((element) => (element.id === todo.id) ? todo : element);
        }

        __saveTodosInStateAndStore(updatedList);
    };

    const deleteAllCompleted = () => {
        const activeTodos = TodoStore.loadAll().filter((todo) => !todo.completed);
        __saveTodosInStateAndStore(activeTodos);
        setFilter('all');
    };

    const __filterTodosByFilter = (todos) => {
        if (filter === 'all') {
            return todos;
        }

        if (filter === 'active') {
            return todos.filter((todo) => !todo.completed);
        }

        if (filter === 'completed') {
            return todos.filter((todo) => todo.completed);
        }

        return todos;
    };

    const starredTodos = __filterTodosByFilter(todos.filter((item) => item.starred));
    const nonStarredTodos = __filterTodosByFilter(todos.filter((item) => !item.starred));

    useEffect(() => {
        setTodos(TodoStore.loadAll());
    }, []);

    return (
        <>
            <div className="todoapp">
                <header className="header">
                    <input
                        type="text"
                        placeholder={'Plan a new thing ...'}
                        value={newTitle}
                        autoFocus={true}
                        onChange={handleOnChangeTitle}
                        onKeyPress={insertNewTodo}
                        className="new-todo"
                    />
                </header>
                <div className="main main--starred">
                    {starredTodos.length > 0 && (
                        <ul className="todo-list">
                            {starredTodos.map((todo) => (
                                <TodoItem
                                    key={todo.id}
                                    item={todo}
                                    updateTodoCallback={(todo) => updateTodoCallback(todo)}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="slide">
                <Article className="slide__header">
                    <input onChange={toggleSlide}
                           id="toggle-slide"
                           type="checkbox"
                           className="toggle-slide" checked={slideOpen}/>
                    <label htmlFor="toggle-slide"
                           className="icon-menu2 icon__medium icon__clickable">
                    </label>
                </Article>
                <div className="main main--slide">
                    <ul className="todo-list">
                        {nonStarredTodos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                item={todo}
                                updateTodoCallback={(todo) => updateTodoCallback(todo)}
                            />
                        ))}
                    </ul>
                </div>
                <Article className="slide__control">
                    <ul className={'filters'}>
                        <li>
                            <a href="#/all">{counter.active} Todos left</a>
                        </li>
                    </ul>
                    <ul className={'filters'}>
                        <li>
                            <a className={filter === 'all' ? 'selected' : undefined}
                               href="#/all"
                               onClick={() => setFilter('all')}
                            >
                                All ({counter.all})
                            </a>
                        </li>

                        <li>
                            <a className={filter === 'active' ? 'selected' : undefined}
                               href="#/active"
                               onClick={() => setFilter('active')}
                            >
                                Active ({counter.active})
                            </a>
                        </li>
                        <li>
                            <a className={filter === 'completed' ? 'selected' : undefined}
                               href="#/completed"
                               onClick={() => setFilter('completed')}
                            >
                                Completed ({counter.completed})
                            </a>
                        </li>
                    </ul>
                    <ul className={'filters'}>
                        <li>
                            <a href="#/completed" onClick={deleteAllCompleted}>Clean all completed</a>
                        </li>
                    </ul>
                </Article>
            </div>
        </>
    );
};

export default Todo;
