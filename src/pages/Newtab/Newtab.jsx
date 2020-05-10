import React, {useState} from 'react';
import '../../assets/style.css';
import '../../assets/animation.less';
import '../../assets/overwrite.less';
import './Newtab.less';
import {Article} from 'react-weui';
import Clock from "./Clock";
import Bookmark from "./bookmark/Bookmark";
import Note from "./note";
import Todo from "./todo";
import Header from "./header";

const NewTab = () => {
    const [visibility, setVisibility] = useState({
        bookmark: true,
        note: false,
    });

    const handleShowBookmark = () => setVisibility({...visibility, bookmark: true, note: false});
    const handleShowNote = () => setVisibility({...visibility, bookmark: false, note: true});

    return (
        <div className={'newTab fade-in'}>
            <div className="left">  
                <Header
                    showBookmark={handleShowBookmark}
                    showNote={handleShowNote}
                />
                {visibility.bookmark && <Bookmark active={visibility.bookmark}/>}
                {visibility.note && <Note active={visibility.note}/>}
            </div>
            <div className="middle">
                <Article className={'todo-container'}>
                    <Todo/>
                </Article>
            </div>
            <div className="right">
                <Article className={'clock-container'}>
                    <Clock/>
                </Article>
            </div>
        </div>
    );
};

export default NewTab;
