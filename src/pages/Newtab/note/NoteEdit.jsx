import React, {useRef, useState, useEffect} from 'react';
import noteStore from "../../../storages/NoteStore";

const NoteEdit = ({note}) => {
    const textRef = useRef();
    const [content, setContent] = useState(note.content || '');
    const [textRows, setTextRows] = useState(3);

    const handleSubmitNote = (event) => {
        if (content.length) {
            noteStore.update({...note, content: content});
        }
    };

    const handleChangeText = (event) => {
        setContent(event.target.value);
    };

    useEffect(() => {
        const rowsOfTextArea = Math.floor(textRef.current.scrollHeight / 20);
        setTextRows(rowsOfTextArea);
    }, []);

    return (
        <textarea
            className={'textarea-note'}
            ref={textRef}
            value={content}
            onChange={handleChangeText}
            onBlur={handleSubmitNote}
            rows={textRows}
        />
    );
};

export default NoteEdit;
