import React from 'react';
import './Pop.less';
import NoteForm from "./NoteForm";
//import weui styles
import 'weui';
import 'react-weui/build/packages/react-weui.css';

const Popup = () => {
    return <div className="pop-container">
        <NoteForm/>
    </div>;
};

export default Popup;
