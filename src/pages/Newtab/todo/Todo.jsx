import React, {useState, useEffect, useRef} from 'react';
import classnames from 'classnames';
import './Todo.less';
import TodoItem from "./TodoItem";
import {Article, Toptips} from 'react-weui';
import TodoFactory from "./TodoFactory";
import todoStore from "../../../helpers/TodoStore";
import TodoConfig from "./TodoConfig";

const Filter = {
    all: 'all',
    active: 'active',
    completed: 'completed',
};

const Todo = () => {
    // state for toggle
    const [searchMode, setSearchMode] = useState(false);
    const [slideOpen, setSlideOpen] = useState(true);
    const [showToptips, setShowToptips] = useState(false);
    // state for list
    const [todos, setTodos] = useState({});
    // state for input
    const [newTodo, setNewTodo] = useState('');
    // state for control bar
    const [filter, setFilter] = useState('all');
    const [counter, setCounter] = useState({});
    // auto focus
    const newTodoRef = useRef(null);

    const __calculateCounter = (updatedList) => {
        const keys = Object.keys(updatedList);
        const all = keys.length;
        const completed = keys.filter((key) => updatedList[key].completed).length;
        const active = all - completed;

        return ({all, active, completed});
    };

    const __saveTodosInStateAndStore = (updatedList) => {
        setTodos(updatedList);
        setCounter(__calculateCounter(updatedList));

        todoStore.saveTodos(updatedList);
    };

    const toggleSlide = () => {
        setSlideOpen(!slideOpen);
    };

    const toggleSearchMode = () => {
        setSearchMode(!searchMode);
        setNewTodo('');
    };

    const showTopTip = () => {
        setShowToptips(true);
        setTimeout(() => {
            setShowToptips(false);
        }, 3000);
    };

    const handleChangeNewTodoInput = (event) => {
        const inputValue = event.target.value;
        setNewTodo(inputValue.trimLeft());
    };

    const handlePressKeyInputField = (e) => {
        if (e.key !== 'Enter' || searchMode) {
            return null;
        }

        if (newTodo.length === 0) {
            return null;
        }

        setNewTodo('');
        setSlideOpen(true);

        const newObject = TodoFactory.create(newTodo);
        const updatedList = {[newObject.id]: newObject, ...todos};

        __saveTodosInStateAndStore(updatedList);
    };

    const updateTodoCallback = (todo) => {
        const updatedList = {...todos};
        updatedList[todo.id] = todo;

        __saveTodosInStateAndStore(updatedList);
    };

    const deleteTodoCallback = (todo) => {
        const updatedList = {...todos};
        delete updatedList[todo.id];

        __saveTodosInStateAndStore(updatedList);
    };

    const deleteAllCompleted = () => {
        setFilter('all');

        const activeTodos = {...todos};
        Object.keys(activeTodos).forEach((key) => {
            if (activeTodos[key].completed) {
                delete activeTodos[key];
            }
        });

        __saveTodosInStateAndStore(activeTodos);
    };

    const __filterTodos = () => {
        let keys = Object.keys(todos);
        if (keys.length === 0) {
            return [];
        }

        if (searchMode && newTodo.length >= 3) {
            keys = keys.filter((key) => todos[key].title.includes(newTodo));
        }

        switch (filter) {
            case Filter.completed:
                return keys.filter((key) => todos[key].completed);
            case Filter.active:
                return keys.filter((key) => todos[key].completed === false);
            default:
                return keys;
        }
    };

    const starredTodoKeys = __filterTodos().filter((key) => todos[key].starred);
    const normalTodoKeys = __filterTodos().filter((key) => todos[key].starred === false);

    useEffect(() => {
        newTodoRef.current.focus();
    }, [searchMode]);

    useEffect(() => {
        const todos = todoStore.loadTodos();
        setTodos(todos);
    }, []);

    return (
        <>
            <div className="todoapp">
                <Toptips show={showToptips} type={'warn'}>
                    Max. 3x starred Todos !!!
                </Toptips>
                <header className="header">
                    <span className={searchMode ? "icon-search1 icon-search1--header" : "icon-plus1"}/>
                    <input
                        ref={newTodoRef}
                        autoFocus={true}
                        type="text"
                        placeholder={searchMode ? 'Type for search ...' : 'Add a new todo ...'}
                        value={newTodo}
                        onChange={handleChangeNewTodoInput}
                        onKeyPress={handlePressKeyInputField}
                        className="new-todo"
                    />
                    <span className={searchMode ? "icon-x" : "icon-search1"} onClick={toggleSearchMode}/>
                </header>
                <div className="main main--starred">
                    {starredTodoKeys.length > 0 && (
                        <ul className="todo-list">
                            {starredTodoKeys.map((key) => (
                                <TodoItem
                                    key={todos[key].id}
                                    item={todos[key]}
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
                           className="icon-menu icon__medium icon__clickable">
                    </label>
                </Article>
                <div className="main main--slide">
                    <ul className="todo-list">
                        {slideOpen && normalTodoKeys.map((key) => (
                            <TodoItem
                                key={todos[key].id}
                                item={todos[key]}
                                updateTodoCallback={(todo) => updateTodoCallback(todo)}
                                deleteTodoCallback={(todo) => deleteTodoCallback(todo)}
                                showToptip={showTopTip}
                                numberStarred={starredTodoKeys.length}
                            />
                        ))}
                    </ul>
                </div>
                <Article
                    className={classnames("slide__control", {"shadow": normalTodoKeys.length > TodoConfig.visibleTodosLimit})}>
                    <ul className={'filters'}>
                        <li>
                            <a href="#/all">{counter.active} items left</a>
                        </li>
                    </ul>
                    <ul className={'filters'}>
                        <li>
                            <a className={filter === Filter.all ? 'selected' : undefined}
                               href={"#/" + Filter.all}
                               onClick={() => setFilter(Filter.all)}
                            >
                                All ({counter.all || 0})
                            </a>
                        </li>

                        <li>
                            <a className={filter === Filter.active ? 'selected' : undefined}
                               href={"#/" + Filter.active}
                               onClick={() => setFilter(Filter.active)}
                            >
                                Active ({counter.active || 0})
                            </a>
                        </li>
                        <li>
                            <a className={filter === Filter.completed ? 'selected' : undefined}
                               href={"#/" + Filter.completed}
                               onClick={() => setFilter(Filter.completed)}
                            >
                                Completed ({counter.completed || 0})
                            </a>
                        </li>
                    </ul>
                    <ul className={'filters'}>
                        <li>
                            <a href="#/clean-all-completed" onClick={deleteAllCompleted}>Clean all completed</a>
                        </li>
                    </ul>
                </Article>
            </div>
        </>
    );
};

export default Todo;
