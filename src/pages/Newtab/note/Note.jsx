import React, {useEffect, useState} from 'react';
import noteStore from '../../../storage/NoteStore';
import NoteEdit from "./NoteEdit";

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

    const handleCloseEditingNote = (note) => {
        setEditKey(null);
        const cloned = {...notes};
        cloned[note.id] = note;

        setNotes(cloned);
    };

    useEffect(() => {
        setNotes(noteStore.loadAll());
    }, []);

    return (
        <div className={'fade-in note-container'}>
            {Object.keys(notes).map((key) => (
                <div key={key}>
                    {editKey === key
                        ? (
                            <div className={'edit'}>
                                <NoteEdit note={notes[key]} closeEditing={(note) => handleCloseEditingNote(note)}/>
                            </div>
                        )
                        : (
                            <div className={'view'} onClick={() => handleClickNote(key)}>
                                <span className="close-icon"
                                      onClick={() => handleDeleteNote(key)}>
                                    {'X'}
                                </span>
                                <span>{notes[key].content}</span>
                            </div>
                        )
                    }
                </div>
            ))}
        </div>
    );
};

export default Note;
