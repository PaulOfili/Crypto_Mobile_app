import {put, takeLatest, call, delay} from 'redux-saga/effects';
// import searchReportService from '../../../services/searchReport.service';
import {getBalance} from '../../../services/balance.service';

import {
  GET_BALANCE, 
  GET_BALANCE_START, 
  GET_BALANCE_SUCCESS, 
  GET_BALANCE_FAILURE, 
  POST_CREATE_ACCOUNT_SUCCESS, 
  POST_FUND_ACCOUNT_SUCCESS, 
  POST_MAKE_TRANSFER_SUCCESS, 
  POST_MAKE_WITHDRAW_SUCCESS
} from '../../contants';
import { Alert } from 'react-native';

function* getBalanceWorker(action) {
  yield put({
    type: GET_BALANCE_START,
  })

  try {
    const response = yield call(getBalance, action.payload);

    yield put({
      type: GET_BALANCE_SUCCESS,
      payload: response,
    });

  } catch(error) {

    yield put({
      type: GET_BALANCE_FAILURE,
      payload: error.message,
    });
  }
}

export function* getBalanceWatcher() {
  yield takeLatest([
    GET_BALANCE, 
    POST_CREATE_ACCOUNT_SUCCESS, 
    POST_FUND_ACCOUNT_SUCCESS, 
    POST_MAKE_TRANSFER_SUCCESS,
    POST_MAKE_WITHDRAW_SUCCESS
  ], getBalanceWorker);
}
