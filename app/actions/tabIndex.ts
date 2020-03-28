export const SET_TAB_INDEX = 'SET_TAB_INDEX';

interface SetTabIndex {
  type: typeof SET_TAB_INDEX;
  tabIndex: number;
}

export default function setTabIndex(tabIndex: number): TabIndexActionTypes {
  return {
    type: SET_TAB_INDEX,
    tabIndex
  };
}
export type TabIndexActionTypes = SetTabIndex;
