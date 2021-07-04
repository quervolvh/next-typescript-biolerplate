import { combineReducers } from 'redux';
import auth from './authReducer';

const allReducers = combineReducers({
  auth,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_APP') {
    state = undefined;
  }
  return allReducers(state, action);
};

export default (state, action) => {
  return rootReducer(action.type === 'RESET_APP_SUCCESS' ? { auth: { loggedIn: false } } : { ...state, ...auth }, action);
};
