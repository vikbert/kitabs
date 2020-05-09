import React, {useState, useEffect, useRef} from 'react';
import classnames from 'classnames';
import './Todo.less';
import TodoItem from "./TodoItem";
import {Article, Toptips} from 'react-weui';
import TodoFactory from "./TodoFactory";
import todoStore from "../../../helpers/TodoStore";
import TodoConfig from "./TodoConfig";

const FILTER = {
    all: 'all',
    active: 'active',
    completed: 'completed',
};

const INIT_COUNTER = {
    all: 0,
    active: 0,
    completed: 0,
};

const INIT_TOGGLE = {
    searchActive: false,
    slideActive: true,
    toptipActive: false,
};

const INIT_CONTROL = {
    filter: FILTER.all,
    countActive: 0,
};

const Todo = () => {
    const [todos, setTodos] = useState({});
    const [newTodo, setNewTodo] = useState('');
    const [toggle, setToggle] = useState(INIT_TOGGLE);
    const [control, setControl] = useState(INIT_CONTROL);

    const newTodoRef = useRef(null);

    const __countTodos = (updatedList) => {
        const allKeys = Object.keys(updatedList);

        return {
            countAll: allKeys.length,
            countActive: allKeys.filter((key) => !updatedList[key].completed).length,
        };
    };

    const __saveTodosInStateAndStore = (updatedList) => {
        const {countAll, countActive} = __countTodos(updatedList);
        setControl({...control, countAll, countActive});
        setTodos(updatedList);

        todoStore.saveTodos(updatedList);
    };

    const toggleSlide = () => {
        setToggle({...toggle, slideActive: !toggle.slideActive});
    };

    const toggleSearchMode = () => {
        setToggle({...toggle, searchActive: !toggle.searchActive});
        setNewTodo('');
    };

    const toggleToptip = () => {
        setToggle({...toggle, toptipActive: true});
        setTimeout(() => {
            setToggle({...toggle, toptipActive: false});
        }, 3000);
    };

    const handleChangeNewTodoInput = (event) => {
        const inputValue = event.target.value;
        setNewTodo(inputValue.trimLeft());
    };

    const handlePressKeyInputField = (e) => {
        if (e.key !== 'Enter' || toggle.searchActive) {
            return null;
        }

        if (newTodo.length === 0) {
            return null;
        }

        setNewTodo('');
        setToggle({...toggle, slideActive: true});

        const newObject = TodoFactory.create(newTodo);
        const updatedList = {[newObject.id]: newObject, ...todos};

        __saveTodosInStateAndStore(updatedList);
    };

    const handleClickDeleteCompleted = () => {
        setControl({...control, filter: FILTER.all});

        const activeTodos = {...todos};
        Object.keys(activeTodos).forEach((key) => {
            if (activeTodos[key].completed) {
                delete activeTodos[key];
            }
        });

        __saveTodosInStateAndStore(activeTodos);
    };

    const callbackUpdateTodo = (todo) => {
        const updatedList = {...todos};
        updatedList[todo.id] = todo;

        __saveTodosInStateAndStore(updatedList);
    };

    const callbackDeleteTodo = (todo) => {
        const updatedList = {...todos};
        delete updatedList[todo.id];

        __saveTodosInStateAndStore(updatedList);
    };

    const filterTodos = () => {
        let keys = Object.keys(todos);
        if (keys.length === 0) {
            return [];
        }

        if (toggle.searchActive && newTodo.length >= 3) {
            keys = keys.filter((key) => todos[key].title.includes(newTodo));
        }

        switch (control.filter) {
            case FILTER.completed:
                return keys.filter((key) => todos[key].completed);
            case FILTER.active:
                return keys.filter((key) => todos[key].completed === false);
            default:
                return keys;
        }
    };

    const starredTodoKeys = filterTodos().filter((key) => todos[key].starred);
    const normalTodoKeys = filterTodos().filter((key) => todos[key].starred === false);

    useEffect(() => {
        newTodoRef.current.focus();
    }, [toggle.searchActive]);

    useEffect(() => {
        const todos = todoStore.loadTodos();
        setTodos(todos);
    }, []);

    return (
        <>
            <div className="todoapp">
                <Toptips show={toggle.toptipActive} type={'warn'}>
                    Max. 3x starred Todos !!!
                </Toptips>
                <header className="header">
                    <span className={toggle.searchActive ? "icon-search1 icon-search1--header" : "icon-plus1"}/>
                    <input
                        ref={newTodoRef}
                        autoFocus={true}
                        type="text"
                        placeholder={toggle.searchActive ? 'Type for search ...' : 'Add a new todo ...'}
                        value={newTodo}
                        onChange={handleChangeNewTodoInput}
                        onKeyPress={handlePressKeyInputField}
                        className="new-todo"
                    />
                    <span className={toggle.searchActive ? "icon-x" : "icon-search1"} onClick={toggleSearchMode}/>
                </header>
                <div className="main main--starred">
                    {starredTodoKeys.length > 0 && (
                        <ul className="todo-list">
                            {starredTodoKeys.map((key) => (
                                <TodoItem
                                    key={todos[key].id}
                                    item={todos[key]}
                                    updateTodoCallback={(todo) => callbackUpdateTodo(todo)}
                                    deleteTodoCallback={(todo) => callbackDeleteTodo(todo)}
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
                           className="toggle-slide" checked={toggle.slideActive}/>
                    <label htmlFor="toggle-slide"
                           className="icon-menu icon__medium icon__clickable">
                    </label>
                </Article>
                <div className="main main--slide">
                    <ul className="todo-list">
                        {toggle.slideActive && normalTodoKeys.map((key) => (
                            <TodoItem
                                key={todos[key].id}
                                item={todos[key]}
                                updateTodoCallback={(todo) => callbackUpdateTodo(todo)}
                                deleteTodoCallback={(todo) => callbackDeleteTodo(todo)}
                                showToptip={toggleToptip}
                                numberStarred={starredTodoKeys.length}
                            />
                        ))}
                    </ul>
                </div>
                <Article
                    className={classnames("slide__control", {"shadow": normalTodoKeys.length > TodoConfig.visibleTodosLimit})}>
                    <ul className={'filters'}>
                        <li>
                            <a href="#/all">{control.countActive} items left</a>
                        </li>
                    </ul>
                    <ul className={'filters'}>
                        <li>
                            <a className={control.filter === FILTER.all ? 'selected' : undefined}
                               href={"#/" + FILTER.all}
                               onClick={() => setControl({...control, filter: FILTER.all})}
                            >
                                All ({control.countAll || 0})
                            </a>
                        </li>

                        <li>
                            <a className={control.filter === FILTER.active ? 'selected' : undefined}
                               href={"#/" + FILTER.active}
                               onClick={() => setControl({...control, filter: FILTER.active})}
                            >
                                Active ({control.countActive || 0})
                            </a>
                        </li>
                        <li>
                            <a className={control.filter === FILTER.completed ? 'selected' : undefined}
                               href={"#/" + FILTER.completed}
                               onClick={() => setControl({...control, filter: FILTER.completed})}
                            >
                                Completed ({control.countAll - control.countActive || 0})
                            </a>
                        </li>
                    </ul>
                    <ul className={'filters'}>
                        <li>
                            <a href="#/clean-all-completed" onClick={handleClickDeleteCompleted}>Clean all completed</a>
                        </li>
                    </ul>
                </Article>
            </div>
        </>
    );
};

export default Todo;
