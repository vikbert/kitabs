import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';
import BookmarkStorage from "../../helpers/BookmarkStorage";

chrome.browserAction.onClicked.addListener((tab) => {
    alert('clicked');
});

chrome.runtime.onMessage.addListener((request) => {
    if (request.importBookmarks) {
        chrome.bookmarks.getTree(BookmarkStorage.importBookmarks);
    }

    return false;
});

chrome.bookmarks.onCreated.addListener(BookmarkStorage.removeBookmarks);
chrome.bookmarks.onRemoved.addListener(BookmarkStorage.removeBookmarks);
chrome.bookmarks.onChanged.addListener(BookmarkStorage.removeBookmarks);
