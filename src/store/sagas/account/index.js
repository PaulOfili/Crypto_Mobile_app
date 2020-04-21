import { all } from 'redux-saga/effects';
import { createAccountWatcher } from './account.saga';


export default function* accountSaga() {
    yield all([
        createAccountWatcher()
    ])
}