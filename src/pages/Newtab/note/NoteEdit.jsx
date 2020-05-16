import React, {useRef, useState, useEffect} from 'react';
import noteStore from "../../../storages/NoteStore";
import {Button} from 'react-weui';

const NoteEdit = ({note, rows = null, submitButton = null, closeEdit = () => null}) => {
    const textRef = useRef();
    const [content, setContent] = useState(note.content || '');

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

    useEffect(() => {
        textRef.current.focus();
    }, []);

    return (
        <>
            <textarea
                className={'textarea-note'}
                ref={textRef}
                value={content}
                onChange={handleChangeText}
                onBlur={handleSubmitNote}
                rows={rows || "5"}
            />
            {submitButton && (
                <div className={'align-right'}>
                    <Button size="small" onClick={handleSubmitNote} plain>save and close</Button>
                </div>
            )}
        </>
    );
};

export default NoteEdit;
