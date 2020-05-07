let cache = [];
const KEY_TODOS = 'kitabs_todos';
const KEY_BOOKMARKS = 'bookmarks';

const processBookmarks = (nodes) => {
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
            processBookmarks(bookmark.children);
        }
    }
};

export const importBookmarks = (nodes) => {
    chrome.storage.local.get({[KEY_BOOKMARKS]: []}, function(result) {

        // if bookmarks not set ye
        if (result[KEY_BOOKMARKS].length > 0) {
            console.log('No import necessary!');
            return;
        }

        cache = [];
        processBookmarks(nodes);
        chrome.storage.local.set({[KEY_BOOKMARKS]: cache}, function() {
            console.log(`Imported ${cache.length} bookmarks done!`);
        });
    });
};

export const filterBookmarks = (searchInput, stateCallback) => {
    chrome.storage.local.get(KEY_BOOKMARKS, function(result) {
        const filtered = result[KEY_BOOKMARKS].filter((bookmark) => bookmark.search.toLowerCase().includes(searchInput));
        stateCallback(filtered);
    });
};

export const removeBookmarks = () => {
    console.log('Bookmarks getting removed!');
    chrome.storage.local.remove(KEY_BOOKMARKS);
};

export const saveTodos = (todos) => {
    chrome.storage.local.set({[KEY_TODOS]: todos}, () => {
        console.log('Todos saved in storage:', todos.map((todo) => todo.completed));
    });
};
    
export const loadTodos = (stateCallback) => {
    chrome.storage.local.get(KEY_TODOS, function(result) {
        if (!result) {
            stateCallback([]);
            console.log('result undefined or empty: ', result);
            
            return;
        }
        
        if (Object.keys(result).length === 0) {
            console.log('result is empty object: ', result);
            stateCallback([]);
            return;
        }

        console.log('result OK: ', result);
        stateCallback(result[KEY_TODOS]);
    });
};
