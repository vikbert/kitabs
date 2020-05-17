import React, {useEffect, useState} from 'react';
import noteStore from '../../../storages/NoteStore';
import NoteEdit from "./NoteEdit";

const Note = () => {
    const [notes, setNotes] = useState({});

    const handleDeleteNote = (noteId) => {
        const cloned = {...notes};
        delete cloned[noteId];
        setNotes(cloned);

        noteStore.delete(noteId);
    };

    useEffect(() => {
        setNotes(noteStore.loadAll());
    }, []);

    return (
        <div className={'note-container fade-in'}>
            {/*<NoteEditLarge*/}
            {/*    visible={visible}*/}
            {/*    editNote={editNote}*/}
            {/*    closeEditLarge={handleCloseEdit}*/}
            {/*/>*/}
            {/*<div className="note-grid">*/}
            {Object.keys(notes).map((noteKey) => (
                <div key={noteKey} className={'edit'}>
                    <div className="edit-container">
                        <NoteEdit note={notes[noteKey]}/>
                        <span className={'icon-x close'} onClick={() => handleDeleteNote(noteKey)}/>
                    </div>
                </div>
            ))}
            {/*</div>*/}
        </div>
    );
};

export default Note;
