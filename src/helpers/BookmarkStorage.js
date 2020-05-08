const KEY_BOOKMARKS = 'kitabs_bookmarks';

const BookmarkStorage = {};
BookmarkStorage.importBookmarks = (nodes) => {
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
    
    chrome.storage.local.get({[KEY_BOOKMARKS]: []}, function(result) {
        // if bookmarks not set yet
        if (result[KEY_BOOKMARKS].length > 0) {
            return;
        }

        __processBookmarks(nodes);
        chrome.storage.local.set({[KEY_BOOKMARKS]: cache}, function() {
            console.log(`Imported ${cache.length} bookmarks done!`);
        });
    });
};

BookmarkStorage.filterBookmarks = (searchInput, stateCallback) => {
    chrome.storage.local.get(KEY_BOOKMARKS, function(result) {
        const filtered = result[KEY_BOOKMARKS].filter((bookmark) => bookmark.search.toLowerCase().includes(searchInput));
        stateCallback(filtered);
    });
};

BookmarkStorage.removeBookmarks = () => {
    chrome.storage.local.remove(KEY_BOOKMARKS);
};

export default BookmarkStorage;
