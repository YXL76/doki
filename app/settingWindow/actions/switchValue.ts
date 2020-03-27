export const SET_SWITCH_VALUE = 'SET_SWITCH_VALUE';

interface SetSwitchValue {
  type: typeof SET_SWITCH_VALUE;
  item: object;
}

export default function setSwitchValue(item: object): SwitchValueActionTypes {
  return {
    type: SET_SWITCH_VALUE,
    item
  };
}
export type SwitchValueActionTypes = SetSwitchValue;
