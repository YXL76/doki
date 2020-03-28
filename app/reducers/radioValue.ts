import { radioValue as initialState } from '../initialState';
import { SET_RADIO_VALUE, RadioValueActionTypes } from '../actions/radioValue';

export default function switchValue(
  state = initialState,
  action: RadioValueActionTypes
) {
  switch (action.type) {
    case SET_RADIO_VALUE:
      return { ...state, ...action.item };
    default:
      return state;
  }
}
