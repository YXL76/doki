import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

export type StateType = {
  appdataPath: string;
  tabIndex: number;
  switchValue: object;
  radioValue: object;
  sliderValue: object;
};

export type GetState = () => StateType;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<StateType, Action<string>>;
