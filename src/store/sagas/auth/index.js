import { all } from 'redux-saga/effects';
import { loginUserWatcher, signUpUserWatcher } from './auth.saga';


export default function* authSaga() {
    yield all([
        loginUserWatcher(),
        signUpUserWatcher()
    ])
}