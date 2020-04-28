import {put, takeLatest, call, delay} from 'redux-saga/effects';
// import searchReportService from '../../../services/searchReport.service';
import { getBanks } from '../../../services/common.service';

import {GET_BANKS, GET_BANKS_SUCCESS, GET_BANKS_START, GET_BANKS_FAILURE} from '../../contants';

function* getBanksWorker(action) {

  yield put({
    type: GET_BANKS_START,
  });

  try {
    const response = yield call(getBanks);

    yield put({
      type: GET_BANKS_SUCCESS,
      payload: response,
    });

  } catch (error) {
    yield put({
      type: GET_BANKS_FAILURE,
      payload: error.message
    });
  }
}

export function* getBanksWatcher() {
  yield takeLatest([GET_BANKS], getBanksWorker);
}
