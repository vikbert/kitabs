import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';
import BookmarkStore from "../../helpers/BookmarkStore";
import {logBookmarks} from "../../helpers/Logger";

chrome.browserAction.onClicked.addListener(() => {
    alert('clicked on the extension icon');
});

chrome.runtime.onMessage.addListener((request) => {
    if (request.importBookmarks) {
        logBookmarks('event listener: init import bookmarks');
        chrome.bookmarks.getTree(BookmarkStore.importBookmarks);
    }
    if (request.tts) {
        chrome.tts.speak(request.message, {
            'lang': 'de-DE',
        });
    }

    return false;
});

chrome.bookmarks.onCreated.addListener(BookmarkStore.removeBookmarks);
chrome.bookmarks.onRemoved.addListener(BookmarkStore.removeBookmarks);
chrome.bookmarks.onChanged.addListener(BookmarkStore.removeBookmarks);
