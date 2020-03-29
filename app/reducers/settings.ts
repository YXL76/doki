import { settings as initialState } from '../initialState';
import { SET_SETTINGS, SettingsActionTypes } from '../actions/settings';

export default function switchValue(
  state = initialState,
  action: SettingsActionTypes
) {
  switch (action.type) {
    case SET_SETTINGS:
      return { ...state, ...action.item };
    default:
      return state;
  }
}
