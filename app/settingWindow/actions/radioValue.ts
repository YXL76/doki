export const SET_RADIO_VALUE = 'SET_RADIO_VALUE';

interface SetRadioValue {
  type: typeof SET_RADIO_VALUE;
  item: object;
}

export default function setRadioValue(item: object): RadioValueActionTypes {
  return {
    type: SET_RADIO_VALUE,
    item
  };
}
export type RadioValueActionTypes = SetRadioValue;
