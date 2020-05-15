import React, {useEffect, useState, useRef} from 'react';
import {Cells, CellsTitle, Cell, CellBody, CellFooter} from 'react-weui';
import BookmarkStore from "../../../helpers/BookmarkStore";
import useResize from "../../../hooks/useResize";

const Bookmark = ({active}) => {
    const [bookmarks, setBookmarks] = useState([]);
    const [searchText, setSearchText] = useState('');
    const bookmarkRef = useRef();
    const {width} = useResize(bookmarkRef);

    const handleChangeSearch = (event) => {
        const searchString = event.target.value.trimLeft().toLowerCase();
        setSearchText(searchString);

        if (searchString.length >= 2) {
            BookmarkStore.filterBookmarks(searchString, setBookmarks);
        } else {
            setBookmarks([]);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            const googleQuery = searchText.split(' ').join('+');
            loadUrl(`https://www.google.de/search?q=${googleQuery}`);
        }
    };

    const handleOnBlur = () => {
        setSearchText('');
        setBookmarks([]);
    };

    const loadUrl = (url) => {
        window.close();
        window.open(url);
    };

    useEffect(() => {
        chrome.runtime.sendMessage({importBookmarks: true});
    }, []);

    return (
        <div className={'bookmark fade-in'} ref={bookmarkRef}>
            <div className="search">
                <div className="input-wrapper">
                    <span className="icon-search1"/>
                    <input type="text"
                           placeholder={'Search in Bookmark and web'}
                           className={'search'}
                           value={searchText}
                           onBlur={handleOnBlur}
                           onChange={handleChangeSearch}
                           onKeyPress={handleKeyPress}
                    />
                </div>
            </div>

            <div className={'list-container'}
                 style={{display: bookmarks.length ? "block" : "none", width: `${width - 28}px`}}>
                <CellsTitle>
                    <span>Found</span>
                    <span className={'result-amount'}>{bookmarks.length}</span>
                    <span>Entries</span>
                </CellsTitle>
                <Cells>
                    {bookmarks.map((element, index) => (
                        <Cell onClick={() => loadUrl(element.url)} key={index} access>
                            <CellBody>
                                {element.title}
                            </CellBody>
                            <CellFooter/>
                        </Cell>
                    ))}
                </Cells>
            </div>
        </div>
    );
};

export default Bookmark;
