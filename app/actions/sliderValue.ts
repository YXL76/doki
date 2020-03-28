export const SET_SLIDER_VALUE = 'SET_SLIDER_VALUE';

interface SetSliderValue {
  type: typeof SET_SLIDER_VALUE;
  item: object;
}

export default function setSliderValue(item: object): SliderValueActionTypes {
  return {
    type: SET_SLIDER_VALUE,
    item
  };
}
export type SliderValueActionTypes = SetSliderValue;
