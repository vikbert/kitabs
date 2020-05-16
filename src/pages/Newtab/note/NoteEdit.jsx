import React, {useRef, useState, useEffect} from 'react';
import noteStore from "../../../storages/NoteStore";

const NoteEdit = ({note, rows = null, submitButton = null, closeEdit = () => null}) => {
    const textRef = useRef();
    const [content, setContent] = useState(note.content || '');
    const [textRows, setTextRows] = useState(2);

    const handleSubmitNote = () => {
        if (content.length) {
            const newNote = {...note, content: content};
            noteStore.update(newNote);
            closeEdit(newNote);
        }
    };

    const handleChangeText = (event) => {
        setContent(event.target.value);
    };

    const handleOnKeyUp = (event) => {
        event.target.style.height = "1px";
        event.target.style.height = (25 + event.target.scrollHeight) + "px";
    };

    useEffect(() => {
        const height = textRef.current.scrollHeight;
        const numberOfLines = Math.floor(height / 20);
        setTextRows(numberOfLines);
    }, []);

    return (
        <>
            <textarea
                onKeyUp={handleOnKeyUp}
                className={'textarea-note'}
                ref={textRef}
                value={content}
                onChange={handleChangeText}
                onBlur={handleSubmitNote}
                rows={textRows}
            />
        </>
    );
};

export default NoteEdit;
