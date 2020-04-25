import {GET_BALANCE} from '../../contants';

export const getBalance = (email) => ({
  type: GET_BALANCE,
  payload: email,
});
