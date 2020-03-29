import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import tabIndex from './tabIndex';
import settings from './settings';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    tabIndex,
    settings
  });
}
