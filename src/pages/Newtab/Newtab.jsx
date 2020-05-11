import React, {useState} from 'react';
import Bookmark from "./bookmark/Bookmark";
import Todo from "./todo";
import Clock from "./clock/Clock";

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
                {/*<div className={'alert-container'}>*/}
                {/*    <Alert/>*/}
                {/*</div>*/}
                <Bookmark active={visibility.bookmark}/>

                <div className="clock-container">
                    <Clock/>
                </div>
            </div>
            <div className="right">
                <Todo/>
            </div>
        </div>
    );
};

export default NewTab;
