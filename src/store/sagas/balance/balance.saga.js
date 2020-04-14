import {put, takeLatest, call} from 'redux-saga/effects';
// import searchReportService from '../../../services/searchReport.service';
import {getBalanceRequest} from '../../../services/balance.service';

import {GET_BALANCE, GET_BALANCE_SUCCESS} from '../../contants';

function* getBalanceWorker(action) {
  try {
    const response = yield call(getBalanceRequest);
    console.log(response);

    yield put({
      type: GET_BALANCE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* getBalanceWatcher() {
  yield takeLatest([GET_BALANCE], getBalanceWorker);
}
