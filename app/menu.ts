/* eslint @typescript-eslint/ban-ts-ignore: off */
import {
  app,
  Menu,
  shell,
  BrowserWindow,
  MenuItemConstructorOptions
} from 'electron';

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string;
  submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu() {
    this.buildContextMenu();
  }

  buildContextMenu() {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props;

      const contextMenu = [
        {
          label: 'Settings',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y);
          }
        },
        {
          label: 'About',
          submenu: [
            {
              label: 'Home',
              click: () => {
                shell.openExternal('');
              }
            }
          ]
        },
        {
          label: 'Quit',
          click: () => {
            app.quit();
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
}
