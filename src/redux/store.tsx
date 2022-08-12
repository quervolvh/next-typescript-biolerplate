import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from './storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import appReducer from './reducers';
import { toggleToast } from './actions/toastActions';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['auth', 'worker'],
  blacklist: []
};

const enhancer = compose(applyMiddleware(thunk));

const persistedReducer = persistReducer<{ [key: string]: any }>(persistConfig, appReducer);

export const store = createStore(persistedReducer, process.env.NEXT_PUBLIC_NODE_ENV === "production" ? enhancer : composeWithDevTools(enhancer));

export const accessToken: () => string = () => store.getState()?.auth?.accesstoken;

export type typeOfDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export const quickToast = (feed: { text: string }) => store.dispatch(toggleToast(feed));
