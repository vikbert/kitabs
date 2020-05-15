import React from 'react';
import {Article} from 'react-weui';
import './popup.less';

const Popup = ({show, children}) => show && (
    <div className="popup-wrapper">
        <Article className="popup-body">
            {children}
        </Article>
    </div>
);

export default Popup;
