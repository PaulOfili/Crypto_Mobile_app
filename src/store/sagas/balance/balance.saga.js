import {put, takeLatest, call, delay} from 'redux-saga/effects';
// import searchReportService from '../../../services/searchReport.service';
import {getBalance} from '../../../services/balance.service';

import {GET_BALANCE, GET_BALANCE_START, GET_BALANCE_SUCCESS, POST_CREATE_ACCOUNT_SUCCESS} from '../../contants';

function* getBalanceWorker(action) {
  yield put({
    type: GET_BALANCE_START,
  })

  try {
    const response = yield call(getBalance);
    console.log(response);
    // yield delay(2000);

    // const response = 'test'
    yield put({
      type: GET_BALANCE_SUCCESS,
      payload: response,
    });

  } catch (error) {
    console.log(error);
  }
}

export function* getBalanceWatcher() {
  yield takeLatest([GET_BALANCE, POST_CREATE_ACCOUNT_SUCCESS], getBalanceWorker);
}
