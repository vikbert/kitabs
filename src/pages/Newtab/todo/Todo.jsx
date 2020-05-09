import React, {useState, useEffect, useRef} from 'react';
import classnames from 'classnames';
import './Todo.less';
import TodoItem from "./TodoItem";
import {Article, Toptips} from 'react-weui';
import TodoFactory from "./TodoFactory";
import todoStore from "../../../helpers/TodoStore";
import TodoConfig from "./TodoConfig";

const Todo = () => {
    const [searchMode, setSearchMode] = useState(false);
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [filter, setFilter] = useState('all');
    const [slideOpen, setSlideOpen] = useState(true);
    const [counter, setCounter] = useState({
        all: 0,
        active: 0,
        completed: 0,
    });
    const [showToptips, setShowToptips] = useState(false);
    const newTodoRef = useRef(null);

    const updateCounter = (todos) => {
        const all = todos.length;
        const completed = todos.filter((element) => element.completed).length;
        const active = all - completed;
        setCounter({all, active, completed});
    };

    const toggleSlide = () => {
        setSlideOpen(!slideOpen);
    };

    const toggleSearchMode = () => {
        setSearchMode(!searchMode);
        setNewTodo('');
    };

    const handleChangeNewTodo = (event) => {
        const inputValue = event.target.value;
        setNewTodo(inputValue.trimLeft());
    };

    const handleShowToptip = () => {
        setShowToptips(true);
        setTimeout(() => {
            setShowToptips(false);
        }, 3000);
    };

    const __saveTodosInStateAndStore = (updatedList) => {
        setTodos(updatedList);
        updateCounter(updatedList);
        todoStore.saveAll(updatedList);
    };

    const insertNewTodo = (e) => {
        if (e.key !== 'Enter' || searchMode) {
            return null;
        }

        if (newTodo.length === 0) {
            return null;
        }

        setNewTodo('');
        setSlideOpen(true);

        const updatedList = [TodoFactory.create(newTodo), ...todos];
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
        const activeTodos = todoStore.loadAll().filter((todo) => !todo.completed);
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
        if (!searchMode) {
            return;
        }

        let matchedList = [];
        if (newTodo.length === 0) {
            setTodos(todoStore.loadAll());
        } else if (newTodo.length > 2) {
   
            
        }
    }, [newTodo]);

    useEffect(() => {
        newTodoRef.current.focus();
    }, [searchMode]);

    useEffect(() => {
        setTodos(todoStore.loadAll());
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
                        onChange={handleChangeNewTodo}
                        onKeyPress={insertNewTodo}
                        className="new-todo"
                    />
                    <span className={searchMode ? "icon-x" : "icon-search1"} onClick={toggleSearchMode}/>
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
                           className="icon-menu icon__medium icon__clickable">
                    </label>
                </Article>
                <div className="main main--slide">
                    <ul className="todo-list">
                        {slideOpen && nonStarredTodos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                item={todo}
                                updateTodoCallback={(todo) => updateTodoCallback(todo)}
                                showToptip={handleShowToptip}
                                numberStarred={starredTodos.length}
                            />
                        ))}
                    </ul>
                </div>
                <Article
                    className={classnames("slide__control", {"shadow": nonStarredTodos.length > TodoConfig.visibleTodosLimit})}>
                    <ul className={'filters'}>
                        <li>
                            <a href="#/all">{counter.active} items left</a>
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
