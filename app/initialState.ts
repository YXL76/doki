import path from 'path';
import fs from 'fs';
import { settingsType } from './reducers/types';

const defaultSettings: settingsType = {
  // general
  autostart: false,
  notification: true,
  panelPosition: 'top',
  panelLevel: 'default',
  callShortcut: 'none',
  // personalization
  iconSize: 32,
  iconOpacity: 100,
  iconZoom: 8,
  iconSpacing: 16,
  panelOpacity: 100
  // icon
};

const appdataPath = path.join(
  process.env.LOCALAPPDATA ||
    process.env.APPDATA ||
    process.env.HOME ||
    process.env.HOMEPATH ||
    process.env.USERPROFILE ||
    __dirname,
  'doki'
);

export const settingPath = path.join(appdataPath, 'setting.json');

export function readSetting() {
  try {
    fs.readdirSync(appdataPath);
  } catch (err) {
    fs.mkdirSync(appdataPath);
  }

  try {
    const data = fs.readFileSync(settingPath, 'utf8');
    return { ...defaultSettings, ...JSON.parse(data) };
  } catch (err) {
    return defaultSettings;
  }
}

export const settings = readSetting();

export const tabIndex = 0;

export const initialState = {
  tabIndex,
  settings
};
