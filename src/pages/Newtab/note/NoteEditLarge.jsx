import React from 'react';
import {Button} from 'react-weui'
import NoteEdit from "./NoteEdit";

const NoteEditLarge = ({visible, note, closeEditLarge}) => {
    return visible && note && (
        <div className={'edit-popup'}>
            <div className="edit-container with-corner with-shadow">
                <div className="note-title">
                    Edit
                </div>
                <div className="note-body">
                    <NoteEdit note={note} rows={20}/>
                </div>
                <div className="popup-control">
                    <Button size={'small'} plain onClick={closeEditLarge}>close</Button>
                </div>
            </div>
        </div>
    );
};

export default NoteEditLarge;
