import { sliderValue as initialState } from '../../initialState';
import {
  SET_SLIDER_VALUE,
  SliderValueActionTypes
} from '../actions/sliderValue';

export default function switchValue(
  state = initialState,
  action: SliderValueActionTypes
) {
  switch (action.type) {
    case SET_SLIDER_VALUE:
      return { ...state, ...action.item };
    default:
      return state;
  }
}
