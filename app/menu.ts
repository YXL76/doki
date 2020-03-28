/* eslint @typescript-eslint/ban-ts-ignore: off */
import { app, Menu, shell, BrowserWindow } from 'electron';
/* import fs from 'fs';
import { getIcon } from 'file-icon-info';

const detail = shell.readShortcutLink(
  'C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Notepad++.lnk'
);

getIcon(detail.target, data => {
  fs.writeFileSync('C:\\Users\\chenx\\Desktop\\test.png', data, 'base64');
}); */

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  settingWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow, settingWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
    this.settingWindow = settingWindow;
  }

  buildMenu() {
    this.buildMainWindowContextMenu();
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.buildSettingWindowContextMenu();
    }

    const menu = Menu.buildFromTemplate([]);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  buildMainWindowContextMenu() {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props;

      const contextMenu = [
        {
          label: 'Settings',
          click: () => {
            this.settingWindow.show();
            this.settingWindow.focus();
          }
        },
        {
          label: 'About',
          submenu: [
            {
              label: 'Home',
              click: () => {
                shell.openExternal('https://github.com/YXL76/doki');
              }
            }
          ]
        },
        {
          label: 'Quit',
          click: () => {
            app.exit();
          }
        }
      ];

      if (
        process.env.NODE_ENV === 'development' ||
        process.env.DEBUG_PROD === 'true'
      ) {
        contextMenu.push({
          label: 'Inspect element',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y);
          }
        });
      }

      Menu.buildFromTemplate(contextMenu).popup({ window: this.mainWindow });
    });
  }

  buildSettingWindowContextMenu() {
    this.settingWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props;

      const contextMenu = [
        {
          label: 'Inspect element',
          click: () => {
            this.settingWindow.webContents.inspectElement(x, y);
          }
        }
      ];

      Menu.buildFromTemplate(contextMenu).popup({ window: this.settingWindow });
    });
  }
}
