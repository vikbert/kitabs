import React, {useEffect, useState} from 'react';
import noteStore from '../../../storages/NoteStore';
import NoteTextArea from "./NoteEdit";
import useVisible from "../../../hooks/useVisible";
import NoteEditLarge from "./NoteEditLarge";

const Note = () => {
    const [notes, setNotes] = useState({});
    const [editNote, setEditNote] = useState(null);
    const {visible, show, hide} = useVisible();

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

    useEffect(() => {
        setNotes(noteStore.loadAll());
    }, []);

    return (
        <div className={'note-container fade-in'}>
            <NoteEditLarge visible={visible} note={editNote} closeEditLarge={hide}/>
            <div className="note-grid">
                {Object.keys(notes).map((noteKey) => (
                    <div key={noteKey} className={'edit'}>
                        <NoteTextArea note={notes[noteKey]}/>
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
