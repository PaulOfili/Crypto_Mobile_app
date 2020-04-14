import {all} from 'redux-saga/effects';
// import authSaga from './auth';
import balanceSaga from './balance';
// import searchReport from './searchReport';

export default function* rootSaga() {
  yield all([/*authSaga(), */ balanceSaga() /*,searchReport()*/]);
}
