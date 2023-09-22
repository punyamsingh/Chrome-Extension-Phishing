// Listen for changes in the active tab and update the popup when the URL changes
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    const url = changeInfo.url;
    const urlLength = url.length;
    chrome.action.setPopup({ tabId: tab.id, popup: `popup.html?urlLength=${urlLength}&url=${encodeURIComponent(url)}` });
  }
});
