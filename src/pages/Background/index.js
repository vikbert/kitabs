import '../../assets/img/icon-34.png';
import BookmarkStore from "../../storages/BookmarkStore";
import {logBookmarks, logPopup} from "../../helpers/Logger";

chrome.browserAction.onClicked.addListener(() => {
    logPopup('Popup is open by click');
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
