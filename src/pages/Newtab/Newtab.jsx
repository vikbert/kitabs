import React from 'react';
import './Newtab.less';
import {Article} from 'react-weui';
import Clock from "./Clock";
import Bookmark from "./Bookmark";
import Todo from "./todo/Todo";

const NewTab = () => {
    return (
        <div className={'newTab'}>
            <div className="left">
                <Bookmark/>
            </div>
            <div className="right">
                <Article className={'clock-container'}>
                    <div className={'alert'}></div>
                    <Clock/>
                </Article>
                <Article className={'todo-container'}>
                    <Todo/>
                </Article>
            </div>
        </div>
    );
};

export default NewTab;
