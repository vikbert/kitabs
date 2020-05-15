import React, {useState} from 'react';
import classnames from 'classnames';

const Header = ({showBookmark, showNote}) => {
    const [current, setCurrent] = useState('bookmark');

    const handleShowNote = () => {
        showNote();
        setCurrent('note');
    };

    const handleShowBookmark = () => {
        showBookmark();
        setCurrent('bookmark');
    };

    return (
        <div className={'setting'}>
            <div>
                <span className={classnames("icon icon-settings", {"icon-active": current === 'setting'})}
                      onClick={() => alert('not implemented')}/>
            </div>
            <div>
                <span className={classnames("icon icon-file-text", {"icon-active": current === 'note'})}
                      onClick={handleShowNote}/>
                <span className={classnames("icon icon-bookmark", {"icon-active": current === 'bookmark'})}
                      onClick={handleShowBookmark}/>
            </div>
        </div>
    );
};

export default Header;
