import React from 'react';
import NoteEdit from "./NoteEdit";

const NoteEditLarge = ({visible, editNote, closeEditLarge = () => null}) => {
    return visible && editNote && (
        <div className={'edit-popup'}>
            <div className="edit-container with-corner with-shadow">
                <div className="note-title">
                    Edit
                </div>
                <div className="note-body">
                    <NoteEdit 
                        note={editNote} 
                        rows={20} 
                        submitButton={true} 
                        closeEdit={(note) => closeEditLarge(note)}/>
                </div>
            </div>
        </div>
    );
};

export default NoteEditLarge;
