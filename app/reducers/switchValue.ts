import { switchValue as initialState } from '../initialState';
import {
  SET_SWITCH_VALUE,
  SwitchValueActionTypes
} from '../actions/switchValue';

export default function switchValue(
  state = initialState,
  action: SwitchValueActionTypes
) {
  switch (action.type) {
    case SET_SWITCH_VALUE:
      return { ...state, ...action.item };
    default:
      return state;
  }
}
