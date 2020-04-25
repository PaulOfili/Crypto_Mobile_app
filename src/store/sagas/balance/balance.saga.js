import {put, takeLatest, call, delay} from 'redux-saga/effects';
// import searchReportService from '../../../services/searchReport.service';
import {getBalance} from '../../../services/balance.service';

import {GET_BALANCE, GET_BALANCE_START, GET_BALANCE_SUCCESS, GET_BALANCE_FAILURE, POST_CREATE_ACCOUNT_SUCCESS} from '../../contants';
import { Alert } from 'react-native';

function* getBalanceWorker(action) {
  yield put({
    type: GET_BALANCE_START,
  })

  try {
    const response = yield call(getBalance, action.payload);
    console.log(response);

    yield put({
      type: GET_BALANCE_SUCCESS,
      payload: response,
    });

  } catch(error) {
    console.log(error);

    yield put({
      type: GET_BALANCE_FAILURE,
      payload: 'Error',
    });

    Alert.alert('Please try again')
  }
}

export function* getBalanceWatcher() {
  yield takeLatest([GET_BALANCE, POST_CREATE_ACCOUNT_SUCCESS], getBalanceWorker);
}
