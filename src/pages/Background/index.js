import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';
import {importBookmarks, removeBookmarks} from "../../helpers/chromeStorage";

chrome.browserAction.onClicked.addListener((tab) => {
    alert('clicked');
});

chrome.runtime.onMessage.addListener((request) => {
    if (request.importBookmarks) {
        chrome.bookmarks.getTree(importBookmarks);
    }

    return false;
});

chrome.bookmarks.onCreated.addListener(removeBookmarks);
chrome.bookmarks.onRemoved.addListener(removeBookmarks);
chrome.bookmarks.onChanged.addListener(removeBookmarks);
