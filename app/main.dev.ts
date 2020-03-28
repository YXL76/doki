/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, screen, globalShortcut, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { settings } from './initialState';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
let settingWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const { width } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: 1024,
    height: 50,
    x: (width - 1024) / 2,
    y: 64,
    frame: false,
    movable: false,
    closable: false,
    focusable: false,
    alwaysOnTop: true,
    fullscreenable: false,
    skipTaskbar: true,
    show: false,
    hasShadow: false,
    backgroundColor: '#00FFFFFF',
    transparent: true,
    titleBarStyle: 'hidden',
    thickFrame: false,
    webPreferences:
      process.env.NODE_ENV === 'development' || process.env.E2E_BUILD === 'true'
        ? {
            nodeIntegration: true
          }
        : {
            preload: path.join(__dirname, 'dist/mainWindow.renderer.prod.js')
          }
  });

  settingWindow = new BrowserWindow({
    width: 600,
    height: 400,
    fullscreenable: false,
    show: false,
    parent: mainWindow,
    modal: true,
    autoHideMenuBar: true,
    webPreferences:
      process.env.NODE_ENV === 'development' || process.env.E2E_BUILD === 'true'
        ? {
            nodeIntegration: true
          }
        : {
            preload: path.join(__dirname, 'dist/settingWindow.renderer.prod.js')
          }
  });

  mainWindow.loadURL(`file://${__dirname}/mainWindow/app.html`);
  settingWindow.loadURL(`file://${__dirname}/settingWindow/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  settingWindow.webContents.on('did-finish-load', () => {
    if (!settingWindow) {
      throw new Error('"settingWindow" is not defined');
    }
  });

  settingWindow.on('close', event => {
    event.preventDefault();
    settingWindow?.hide();
  });

  mainWindow.on('closed', () => {
    settingWindow?.destroy();
    mainWindow = null;
  });

  settingWindow.on('closed', () => {
    settingWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow, settingWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

export function SetSize() {}

export function SetPosition(win: BrowserWindow) {
  const { x, y } = (() => {
    switch (settings.general.panelPosition) {
      case 'top':
        return { x: 64, y: 64 };
      default:
        return { x: 64, y: 64 };
    }
  })();
  win.setPosition(x, y);
}

export function SetShortcut() {
  const shortcut = settings.general.callShortcut;

  globalShortcut.unregisterAll();

  if (shortcut !== 'none') {
    const ret = globalShortcut.register(shortcut, () => {
      mainWindow?.moveTop();
      mainWindow?.focus();
    });

    if (!ret) {
      dialog.showErrorBox('错误', '快捷键绑定失败');
    }
  }
}

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  createWindow()
    .then(SetShortcut)
    .catch(() => {});
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
