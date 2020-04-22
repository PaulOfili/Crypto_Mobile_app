import {all} from 'redux-saga/effects';
import { getBanksWatcher } from './banks.saga';
import { getCurrenciesWatcher } from './currencies.saga';

export default function* commonDataSaga() {
  yield all([
        getBanksWatcher(),
        getCurrenciesWatcher(),
    ]);
}
