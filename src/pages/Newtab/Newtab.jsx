import React from 'react';
import '../../assets/icon.css';
import '../../assets/animation.less';
import './Newtab.less';
import {Article} from 'react-weui';
import Clock from "./Clock";
import Bookmark from "./Bookmark";
import Todo from "./todo/Todo";

const NewTab = () => {
    return (
        <div className={'newTab fade-in'}>
            <div className="left">
                <Bookmark/>
            </div>
            <div className="middle">
                <Article className={'todo-container'}>
                    <Todo/>
                </Article>
            </div>
            <div className="right">
                <Article className={'clock-container'}>
                    <div className={'alert'}></div>
                    <Clock/>
                </Article>
            </div>
        </div>
    );
};

export default NewTab;
