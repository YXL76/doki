import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

export type settingsType = {
  // general
  autostart: boolean;
  notification: boolean;
  panelPosition: string;
  panelLevel: string;
  callShortcut: string;
  // personalization
  iconSize: number;
  iconOpacity: number;
  iconZoom: number;
  iconSpacing: number;
  panelOpacity: number;
  // icon
};

export type StateType = {
  tabIndex: number;
  settings: settingsType;
};

export type GetState = () => StateType;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<StateType, Action<string>>;
