import React, {useEffect, useState} from 'react';
import noteStore from '../../../storages/NoteStore';
import NoteEdit from "./NoteEdit";
import useVisible from "../../../hooks/useVisible";
import Confirm from "../../../components/Confirm";

const Note = () => {
    const [notes, setNotes] = useState({});
    const {visible, show, hide} = useVisible(false);
    const [target, setTarget] = useState(null);

    const handleDeleteNote = (noteId) => {
        const cloned = {...notes};
        delete cloned[noteId];
        setNotes(cloned);

        noteStore.delete(noteId);
    };

    const openConfirm = (noteKey) => {
        setTarget(noteKey);
        show();
    };

    useEffect(() => {
        setNotes(noteStore.loadAll());
    }, []);

    return (
        <div className={'note-container fade-in'}>
            <Confirm
                visible={visible}
                hide={hide}
                confirmCallback={() => handleDeleteNote(target)}
                message={'Are you sure to delete this note?'}
            />
            <div className="note-list">
                {Object.keys(notes).map((noteKey) => (
                    <div key={noteKey} className={'edit'}>
                        <div className="edit-container">
                            <NoteEdit note={notes[noteKey]}/>
                            <span className={'icon-x close'} onClick={() => openConfirm(noteKey)}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Note;
