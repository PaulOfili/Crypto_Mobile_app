import {put, takeLatest, call, delay} from 'redux-saga/effects';
import { getCurrencies } from '../../../services/common.service';

import {GET_CURRENCIES, GET_CURRENCIES_SUCCESS, GET_CURRENCIES_START, POST_CREATE_ACCOUNT_SUCCESS} from '../../contants';

function* getCurrenciesWorker(action) {

  yield put({
    type: GET_CURRENCIES_START,
  });

  try {
    // const response = yield call(getCurrencies);
    // console.log(response);
    yield delay(2000);

    const response = 'test'
    yield put({
      type: GET_CURRENCIES_SUCCESS,
      payload: response,
    });

  } catch (error) {
    console.log(error);
  }
}

export function* getCurrenciesWatcher() {
  yield takeLatest([GET_CURRENCIES, POST_CREATE_ACCOUNT_SUCCESS], getCurrenciesWorker);
}
