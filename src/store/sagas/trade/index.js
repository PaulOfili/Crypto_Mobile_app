import {all} from 'redux-saga/effects';
import { makeTransferWatcher } from './transfer.saga';
import { makeWithdrawWatcher } from './withdraw.saga';
import { fundAccountWatcher } from './fund.saga';

export default function* tradeSaga() {
  yield all([
        makeTransferWatcher(),
        makeWithdrawWatcher(),
        fundAccountWatcher(),
    ]);
}
