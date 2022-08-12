import { combineReducers } from 'redux';
import auth from './authReducer';
import route from './routerReducer';
import user from './userReducer';
import toast from './toastReducer';
import util from './utilReducer';
import worker from './workerReducer';

const allReducers = combineReducers({
  auth,
  route,
  user,
  toast,
  util,
  worker
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_APP') {
    state = undefined;
  }
  return allReducers(state, action);
};

export default (state: any, action: { [key: string]: any }) => {
  return rootReducer(action.type === 'RESET_APP_SUCCESS' ? { auth: { loggedIn: false } } : { ...state, ...auth }, action);
};
