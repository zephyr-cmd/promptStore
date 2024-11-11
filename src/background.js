// background.js
browser.runtime.onInstalled.addListener(() => {
  // Create context menu when extension is installed
  browser.contextMenus.create({
    id: "savePrompt",
    title: "Save as New Prompt",
    contexts: ["selection"], // This will appear when text is selected
  });
});

// Listener for the context menu item click event
browser.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "savePrompt" && info.selectionText) {
    // Store the selected text in the local storage to be accessed in the popup
    browser.storage.local.set({ selectedContent: info.selectionText }, () => {
      // Optionally open the popup (you can also use `browser.action.openPopup()` here)
      // but in Firefox, it doesn't support automatically opening the popup.
      console.log("Selected content saved.");
    });
  }
});
