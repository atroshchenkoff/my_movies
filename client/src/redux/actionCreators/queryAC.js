import { SET_QUERY } from '../actionTypes/query';

export const queryAC = (payload) => ({
  type: SET_QUERY,
  payload,
});
