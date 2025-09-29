// WasteRoute Pro Desktop — Main Process
const { app, BrowserWindow, shell } = require("electron");
const path = require("path");

const APP_URL = "https://exeterwasteremoval.co.uk";

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    backgroundColor: "#111827",
    title: "WasteRoute Pro – Dispatcher",
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  // Load the live website, fallback to local file if offline
  mainWindow.loadURL(APP_URL).catch(() => {
    mainWindow.loadFile(path.join(__dirname, "renderer", "index.html"));
  });

  // Open external links in browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  mainWindow.on("closed", () => { mainWindow = null; });
}

app.whenReady().then(() => {
  createMainWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
