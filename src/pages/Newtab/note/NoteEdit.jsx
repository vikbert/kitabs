import React, {useRef, useState, useEffect} from 'react';
import noteStore from "../../../storage/NoteStore";

const NoteEdit = ({note, closeEditing}) => {
    const textRef = useRef();
    const [content, setContent] = useState(note.content || '');

    const handleSubmitNote = () => {
        if (content.length) {
            const newNote = {...note, content: content};
            console.log(newNote);
            noteStore.update(newNote);
        }
    };

    const handleOnBlur = () => {
        handleSubmitNote();
        closeEditing({...note, content: content});
    };

    const handleChangeText = (event) => {
        setContent(event.target.value);
    };

    useEffect(() => {
        textRef.current.focus();
    }, []);

    return (
        <textarea
            ref={textRef}
            value={content}
            onChange={handleChangeText}
            onBlur={handleOnBlur}

            rows="7"
        />
    );
};

export default NoteEdit;
