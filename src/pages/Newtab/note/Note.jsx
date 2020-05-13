import React, {useEffect, useState} from 'react';
import {Article} from 'react-weui';
import noteStore from '../../../storage/NoteStore';

const Note = () => {
    const [notes, setNotes] = useState({});
    const [editKey, setEditKey] = useState(null);

    const handleDeleteNote = (noteId) => {
        const cloned = {...notes};
        delete cloned[noteId];
        setNotes(cloned);

        noteStore.delete(noteId);
    };

    const handleClickNote = (noteId) => {
        setEditKey(noteId);
    };

    useEffect(() => {
        setNotes(noteStore.loadAll());
    }, []);

    return (
        <Article className={'fade-in'}>
            <ul>
                {Object.keys(notes).map((key) => (
                    <li key={key}>
                        <a href="#" className={editKey === key ? 'edit': null} onClick={() => handleClickNote(key)}>
                          <span className="close-icon"
                                onClick={() => handleDeleteNote(key)}>
                          {'X'}
                          </span>
                            <span>{notes[key].content}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </Article>
    );
};

export default Note;
