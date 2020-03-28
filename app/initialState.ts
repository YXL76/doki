import path from 'path';
import fs from 'fs';

type settingsType = {
  general: {
    autostart: boolean;
    notification: boolean;
    panelPosition: string;
    panelLevel: string;
    callShortcut: string;
  };
  personalization: {
    iconSize: number;
    iconOpacity: number;
    iconZoom: number;
    iconSpacing: number;
    panelOpacity: number;
  };
  icon: {};
};

const defaultSettings: settingsType = {
  general: {
    autostart: false,
    notification: true,
    panelPosition: 'top',
    panelLevel: 'default',
    callShortcut: 'none'
  },
  personalization: {
    iconSize: 32,
    iconOpacity: 100,
    iconZoom: 8,
    iconSpacing: 16,
    panelOpacity: 100
  },
  icon: {}
};

export const appdataPath = path.join(
  process.env.LOCALAPPDATA ||
    process.env.APPDATA ||
    process.env.HOME ||
    process.env.HOMEPATH ||
    process.env.USERPROFILE ||
    __dirname,
  'doki'
);

export const settingPath = path.join(appdataPath, 'setting.json');

let customSettings: settingsType;

try {
  fs.readdirSync(appdataPath);
} catch (err) {
  fs.mkdirSync(appdataPath);
}

try {
  const data = fs.readFileSync(settingPath, 'utf8');
  customSettings = { ...defaultSettings, ...JSON.parse(data) };
} catch (err) {
  customSettings = defaultSettings;
}

export const settings = customSettings;

export const tabIndex = 0;

export const switchValue = {
  autostart: settings.general.autostart,
  notification: settings.general.notification
};

export const radioValue = {
  panelPosition: settings.general.panelPosition,
  panelLevel: settings.general.panelLevel,
  callShortcut: settings.general.callShortcut
};

export const sliderValue = {
  iconSize: settings.personalization.iconSize,
  iconOpacity: settings.personalization.iconOpacity,
  iconZoom: settings.personalization.iconZoom,
  iconSpacing: settings.personalization.iconSpacing,
  panelOpacity: settings.personalization.panelOpacity
};

export const initialState = {
  appdataPath,
  tabIndex,
  switchValue,
  radioValue,
  sliderValue
};
