import path from 'path';

export const appdataPath = path.join(
  process.env.LOCALAPPDATA ||
    process.env.APPDATA ||
    process.env.HOME ||
    process.env.HOMEPATH ||
    process.env.USERPROFILE ||
    __dirname,
  'doki'
);

export const tabIndex = 0;

export const switchValue = {};

export const radioValue = {};

export const sliderValue = {
  iconSize: 32
};

export const initialState = {
  appdataPath,
  tabIndex,
  switchValue,
  radioValue,
  sliderValue
};
