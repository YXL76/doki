export const SET_SETTINGS = 'SET_SETTINGS';

interface SetSettings {
  type: typeof SET_SETTINGS;
  item: object;
}

export default function setSettings(item: object): SettingsActionTypes {
  return {
    type: SET_SETTINGS,
    item
  };
}
export type SettingsActionTypes = SetSettings;
