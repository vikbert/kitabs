import React from 'react';
import './popup.less';

const Popup = ({show, hide, footer = null, children}) => {

    return show && (
        <div className="popup-wrapper">
            <div className="popup">
                <div className="header">
                    <div className="icon-close icon-x" onClick={hide}/>
                </div>
                {children}
                {footer && (
                    <div className="footer">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Popup;
