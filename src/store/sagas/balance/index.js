import {all} from 'redux-saga/effects';
import {getBalanceWatcher} from './balance.saga';

export default function* requestsSaga() {
  yield all([getBalanceWatcher()]);
}
