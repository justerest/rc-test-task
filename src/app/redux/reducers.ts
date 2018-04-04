import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import { IStore } from './IStore';
import { counterReducer } from './modules/counter';
import { matrixReducer } from './modules/matrix';
import { starsReducer } from './modules/stars';

const { reducer } = require('redux-connect');

const rootReducer: Redux.Reducer<IStore> = combineReducers<IStore>({
  counter: counterReducer,
  matrix: matrixReducer,
  reduxAsyncConnect: reducer,
  routing: routerReducer,
  stars: starsReducer,
});

export default rootReducer;
