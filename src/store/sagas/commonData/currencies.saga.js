import {put, takeLatest, call, delay} from 'redux-saga/effects';
import { getCurrencies } from '../../../services/common.service';

import {GET_CURRENCIES, GET_CURRENCIES_SUCCESS, GET_CURRENCIES_START, POST_CREATE_ACCOUNT_SUCCESS, GET_CURRENCIES_FAILURE} from '../../contants';

function* getCurrenciesWorker(action) {

  yield put({
    type: GET_CURRENCIES_START,
  });

  try {
    const response = yield call(getCurrencies);

    yield put({
      type: GET_CURRENCIES_SUCCESS,
      payload: response,
    });

  } catch (error) {

    yield put({
      type: GET_CURRENCIES_FAILURE,
    });
  }
}

export function* getCurrenciesWatcher() {
  yield takeLatest([GET_CURRENCIES, POST_CREATE_ACCOUNT_SUCCESS], getCurrenciesWorker);
}
