import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import cdeReducer from './cde.js';

export default combineReducers({
  router: routerReducer,
  cde: cdeReducer,
});
