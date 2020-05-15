import {logBookmarks} from "../helpers/Logger";
import store from 'store';

const BookmarkStore = {key: 'kitabs_bookmarks'};

BookmarkStore.importBookmarks = (nodes) => {
    let cache = [];
    const __processBookmarks = (nodes) => {
        for (let i = 0; i < nodes.length; i++) {
            let bookmark = nodes[i];
            if (bookmark.url) {
                const searchString = bookmark.title + ' ' + bookmark.url;
                cache.push({
                    search: searchString,
                    title: bookmark.title,
                    url: bookmark.url,
                });
            }

            if (bookmark.children) {
                __processBookmarks(bookmark.children);
            }
        }
    };

    const bookmarks = store.get(BookmarkStore.key, []);
    if (bookmarks.length > 0) {
        logBookmarks('do nothing, because bookmarks are import already');
        return;
    }

    __processBookmarks(nodes);
    logBookmarks('load bookmarks', cache);
    store.set(BookmarkStore.key, cache);
};

BookmarkStore.filterBookmarks = (searchInput, stateCallback) => {
    const bookmarks = store.get(BookmarkStore.key, []);
    stateCallback(bookmarks.filter((bookmark) => bookmark.search.toLowerCase().includes(searchInput)));
};

BookmarkStore.removeBookmarks = () => {
    chrome.storage.local.remove(BookmarkStore.key);
};

export default BookmarkStore;
