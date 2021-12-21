import { SET_QUERY } from '../actionTypes/query';

export const queryReducer = (state = { query: '' }, action) => {
  switch (action.type) {
    case SET_QUERY:
      return { ...state, query: action.payload };

    default:
      return state;
  }
};
