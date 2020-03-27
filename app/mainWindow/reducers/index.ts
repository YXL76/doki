import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import appdataPath from './appdataPath';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    appdataPath
  });
}
