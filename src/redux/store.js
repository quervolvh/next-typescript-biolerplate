import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import appReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['auth', 'user'],
  blacklist: [],
};

const enhancer = compose(applyMiddleware(thunk));

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = createStore(persistedReducer, composeWithDevTools(enhancer));

export const persistor = persistStore(store);
