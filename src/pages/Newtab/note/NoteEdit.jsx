import React, {useRef, useState, useEffect} from 'react';
import noteStore from "../../../storages/NoteStore";

const NoteEdit = ({note}) => {
    const textRef = useRef();
    const [content, setContent] = useState(note.content || '');
    const [textRows, setTextRows] = useState(3);

    const handleSubmitNote = (event) => {
        if (content.length) {
            noteStore.update({...note, content: content});
            console.log(event.target.scrollHeight);
        }
    };

    const handleChangeText = (event) => {
        setContent(event.target.value);
    };

    const handleOnKeyUp = (event) => {
        // todo: this code causes performance and crash in the extension
        // event.target.style.height = "1px";
        // event.target.style.height = (25 + event.target.scrollHeight) + "px";
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
