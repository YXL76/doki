import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import appdataPath from './appdataPath';
import tabIndex from './tabIndex';
import switchValue from './switchValue';
import radioValue from './radioValue';
import sliderValue from './sliderValue';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    appdataPath,
    tabIndex,
    switchValue,
    radioValue,
    sliderValue
  });
}
