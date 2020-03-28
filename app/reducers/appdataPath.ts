import { Action } from 'redux';
import { appdataPath as initialState } from '../initialState';

export default function appdataPath(
  state = initialState,
  action: Action<string>
) {
  switch (action.type) {
    default:
      return state;
  }
}
