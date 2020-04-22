import {all} from 'redux-saga/effects';
import authSaga from './auth';
import accountSaga from './account';
import balanceSaga from './balance';
import commonDataSaga from './commonData';

export default function* rootSaga() {
  yield all([
    authSaga(),  
    balanceSaga(), 
    accountSaga(),
    commonDataSaga(),
  ]);
}
