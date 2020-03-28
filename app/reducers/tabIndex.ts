import { tabIndex as initialState } from '../initialState';
import { SET_TAB_INDEX, TabIndexActionTypes } from '../actions/tabIndex';

export default function appdataPath(
  state = initialState,
  action: TabIndexActionTypes
) {
  switch (action.type) {
    case SET_TAB_INDEX:
      return action.tabIndex;
    default:
      return state;
  }
}
