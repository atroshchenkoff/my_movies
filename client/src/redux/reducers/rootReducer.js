import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { queryReducer } from './queryReducer';


export const rootReducer = combineReducers({
  userReducer,
  queryReducer,
})
