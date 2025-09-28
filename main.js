const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

// HARD-CODED URL for simplicity — change here if your site URL changes
const APP_URL = 'https://exeterwasteremoval.co.uk';

function createWindow () {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    backgroundColor: '#111827',
    title: 'WasteRoute Pro – Dispatcher',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  if (APP_URL && APP_URL.startsWith('http')) {
    win.loadURL(APP_URL);
  } else {
    win.loadFile(path.join(__dirname, 'renderer', 'index.html'));
  }

  // Open external links in default browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
