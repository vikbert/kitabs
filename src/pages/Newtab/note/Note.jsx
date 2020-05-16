import React, {useEffect, useState} from 'react';
import noteStore from '../../../storages/NoteStore';
import NoteEdit from "./NoteEdit";
import useVisible from "../../../hooks/useVisible";
import NoteEditLarge from "./NoteEditLarge";

const Note = () => {
    const [notes, setNotes] = useState({});
    const [editNote, setEditNote] = useState(null);
    const {visible, show, hide} = useVisible(false);

    const handleDeleteNote = (noteId) => {
        const cloned = {...notes};
        delete cloned[noteId];
        setNotes(cloned);

        noteStore.delete(noteId);
    };

    const handleOpenLargeEditView = (note) => {
        setEditNote(note);
        show();
    };

    const updateNote = (note) => {
        setNotes({...notes, [note.id]: note});
    };

    const handleCloseEdit = (note) => {
        updateNote(note);
        if (visible) {
            hide();
        }
    };

    useEffect(() => {
        console.log('notes getting updated: ', notes);
    }, [notes]);

    useEffect(() => {
        setNotes(noteStore.loadAll());
    }, []);

    return (
        <div className={'note-container fade-in'}>
            <NoteEditLarge
                visible={visible}
                editNote={editNote}
                closeEditLarge={handleCloseEdit}
            />
            <div className="note-grid">
                {Object.keys(notes).map((noteKey) => (
                    <div key={noteKey} className={'edit'}>
                        <NoteEdit
                            note={notes[noteKey]}
                            closeEdit={(note) => handleCloseEdit(note)}
                        />
                        <div className="note-edit-control">
                            <span className={'icon-x'} onClick={() => handleDeleteNote(noteKey)}/>
                            <span className={'icon-external-link'}
                                  onClick={() => handleOpenLargeEditView(notes[noteKey])}/>
                            <span/>
                            <span/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Note;
