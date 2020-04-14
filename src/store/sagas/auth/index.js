import { all } from 'redux-saga/effects';
import { loginUserWatcher } from './auth.saga';


export default function* authSaga() {
    yield all([
        loginUserWatcher()
    ])
}