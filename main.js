// WasteRoute Pro Desktop — Main Process
// Electron entrypoint for the dispatcher app

const { app, BrowserWindow, shell } = require("electron");
const path = require("path");

// 🟢 Change this if your website URL changes
const APP_URL = "https://exeterwasteremoval.co.uk";

// Keep a global reference to avoid GC closing the window
let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    backgroundColor: "#111827", // dark neutral background
    title: "WasteRoute Pro – Dispatcher",
    autoHideMenuBar: true, // hide default menu
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  // Try to load the live site first
  if (APP_URL && APP_URL.startsWith("http")) {
    mainWindow.loadURL(APP_URL).catch(() => {
      console.warn("⚠️ Failed to load live site, falling back to offline page.");
      mainWindow.loadFile(path.join(__dirname, "renderer", "index.html"));
    });
  } else {
    // Always fallback to offline page if APP_URL is not valid
    mainWindow.loadFile(path.join(__dirname, "renderer", "index.html"));
  }

  // Open all external links in the default browser (not inside the app window)
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// App lifecycle
app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", () => {
    // Re-create window on macOS when dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on("window-all-closed", () => {
  // Quit app when all windows are closed (except on macOS)
  if (process.platform !== "darwin") {
    app.quit();
  }
});
