import React, {useState} from "react";

const TodoTextInput = ({handleInputFieldUpdate, todoTitle}) => {
    const [text, setText] = useState(todoTitle || '');

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleBlur = () => {
        handleInputFieldUpdate(text.trimLeft());
    };

    const handleSubmit = (e) => {
        if (e.key === "Enter") {
            handleInputFieldUpdate(text.trimLeft());
        }
    };

    return (
        <input
            className="edit"
            autoFocus={true}
            type="text"
            value={text}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleSubmit}
        />
    );
};


export default TodoTextInput;
