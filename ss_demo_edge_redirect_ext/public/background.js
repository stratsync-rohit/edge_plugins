
const actionAPI = chrome.action || chrome.browserAction;

actionAPI.onClicked.addListener(function (tab) {
  console.log("Action clicked — creating popup window");

  const availWidth = (typeof screen !== "undefined" && screen.availWidth) ? screen.availWidth : 1024;
  const availHeight = (typeof screen !== "undefined" && screen.availHeight) ? screen.availHeight : 768;

  const width = 400;
  const height = 600;
  const left = Math.round((availWidth - width) / 2);
  const top = Math.round((availHeight - height) / 4);

  chrome.windows.create(
    {
      url: chrome.runtime.getURL("dist/index.html"),
      type: "popup",
      width,
      height,
      left,
      top,
      focused: true
    },
    function (newWindow) {
      if (chrome.runtime.lastError) {
        console.error("Create window error:", chrome.runtime.lastError.message);
      } else {
        console.log("Window opened, id:", newWindow && newWindow.id);
      }
    }
  );
});
