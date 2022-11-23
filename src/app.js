// Import both
const path = require('path');

// Import web
const express = require('express');
const webApp = express();
const PORT = 3769;

// Import electron
const {app, BrowserWindow} = require('electron');

// Web
webApp.get('/', (req, res) => {
  res.send('Hello World');
});

// Electron
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    'width': 600,
    'height': 400
  });

  mainWindow.loadURL(`http://localhost:${PORT}`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Web boot
webApp.listen(PORT);

// Electron boot
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length == 0) {
      createWindow();
    }
  });
});