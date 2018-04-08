import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import { IStore } from './IStore';
import { matrixReducer } from './modules/matrix';

const { reducer } = require('redux-connect');

const rootReducer: Redux.Reducer<IStore> = combineReducers<IStore>({
  matrix: matrixReducer,
  reduxAsyncConnect: reducer,
  routing: routerReducer,
});

export default rootReducer;
