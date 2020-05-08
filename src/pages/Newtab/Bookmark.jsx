import React, {useEffect, useState} from 'react';
import {SearchBar, Cells, CellsTitle, Cell, CellBody, CellFooter} from 'react-weui';
import {filterBookmarks} from "../../helpers/chromeStorage";
import BookmarkLogo from '../../assets/img/bookmark.png';

const Bookmark = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const handleChangeSearchText = (text) => {
        const searchString = text.trim().toLowerCase();

        if (searchString.length >= 2) {
            filterBookmarks(searchString, setBookmarks);
        } else {
            setBookmarks([]);
        }
    };

    const loadUrl = (url) => {
        window.close();
        window.open(url);
    };

    useEffect(() => {
        chrome.runtime.sendMessage({importBookmarks: true});
    }, []);

    return (
        <div className={'bookmark'}>
            <SearchBar
                lang={{cancel: 'Cancel'}}
                onChange={handleChangeSearchText}
                placeholder={'Search in bookmarks'}
            />

            <div className={'list-container'}>
                <div className="top">
                    <CellsTitle>{`Found ${bookmarks.length} entries`}</CellsTitle>
                    <Cells>
                        {bookmarks.map((element, index) => (
                            <Cell onClick={() => loadUrl(element.url)} key={index} access>
                                <CellBody>
                                    {element.title.substr(0, 50)}
                                </CellBody>
                                <CellFooter/>
                            </Cell>
                        ))}
                    </Cells>
                </div>
                <div className="bottom">
                    <img className={'bookmark-logo'} src={BookmarkLogo} alt="bookmark"/>
                </div>
            </div>
        </div>
    );
};

export default Bookmark;
