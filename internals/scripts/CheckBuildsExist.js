// Check if the renderer and main bundles are built
import path from 'path';
import chalk from 'chalk';
import fs from 'fs';

const mainPath = path.join(__dirname, '..', '..', 'app', 'main.prod.js');

function getRendererPath(name: string) {
  return path.join(
    __dirname,
    '..',
    '..',
    'app',
    'dist',
    `${name}.renderer.prod.js`
  );
}

const mainWindowRendererPath = getRendererPath('mainWindow');
const settingWindowRendererPath = getRendererPath('settingWindow');

if (!fs.existsSync(mainPath)) {
  throw new Error(
    chalk.whiteBright.bgRed.bold(
      'The main process is not built yet. Build it by running "yarn build-main"'
    )
  );
}

if (!fs.existsSync(mainWindowRendererPath)) {
  throw new Error(
    chalk.whiteBright.bgRed.bold(
      'The mainWindow renderer process is not built yet. Build it by running "yarn build-renderer"'
    )
  );
}

if (!fs.existsSync(settingWindowRendererPath)) {
  throw new Error(
    chalk.whiteBright.bgRed.bold(
      'The settingWindow renderer process is not built yet. Build it by running "yarn build-renderer"'
    )
  );
}
