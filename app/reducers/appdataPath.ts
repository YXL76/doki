import { Action } from 'redux';

export default function appdataPath(state = '', action: Action<string>) {
  switch (action.type) {
    default:
      return state;
  }
}
