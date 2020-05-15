import React, {useRef, useState, useEffect} from 'react';
import noteStore from "../../../storage/NoteStore";

const NoteEdit = ({note, rows = null}) => {
    const textRef = useRef();
    const [content, setContent] = useState(note.content || '');

    const handleSubmitNote = () => {
        if (content.length) {
            const newNote = {...note, content: content};
            noteStore.update(newNote);
        }
    };

    const handleChangeText = (event) => {
        setContent(event.target.value);
    };

    useEffect(() => {
        textRef.current.focus();
    }, []);

    return (
        <textarea
            className={'textarea-note'}
            ref={textRef}
            value={content}
            onChange={handleChangeText}
            onBlur={handleSubmitNote}
            rows={rows || "5"}
        />
    );
};

export default NoteEdit;
