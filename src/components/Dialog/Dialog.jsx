import React from 'react';

const Dialog = ({show, hide, footer = null, children}) => {

    return show && (
        <div className="dialog-wrapper">
            <div className="dialog">
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

export default Dialog;
