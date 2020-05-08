import React, {useState, useEffect} from 'react';
import './Todo.less';
import {saveTodos, loadTodos} from "../../../helpers/chromeStorage";
import TodoItem from "./TodoItem";
import TodoFactory from "./TodoFactory";
import {Article} from 'react-weui';

const Todo = () => {
    const [newTitle, setNewTitle] = useState('');
    const [todos, setTodos] = useState([]);
    const [open, setOpen] = useState(true);

    const toggleSlide = (e) => {
        setOpen(!open);
        console.log(open);
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
        <>
            <div className="todoapp">
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
                <Article className="slide__control">
                    <input onChange={toggleSlide}
                           id="toggle-slide"
                           type="checkbox"
                           className="toggle-slide" checked={open}/>
                    <label htmlFor="toggle-slide"
                           className="icon-menu2 icon--medium icon__clickable">
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
            </div>
        </>
    );
};

export default Todo;
