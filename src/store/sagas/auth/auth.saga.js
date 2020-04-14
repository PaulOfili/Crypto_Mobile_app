import {put, call, takeLatest} from 'redux-saga/effects';
import {LOGIN_USER, LOGIN_USER_SUCCESS, SHOW_TOAST} from '../../contants';
import {saveCookieData} from '../../../session/cookies';

export function* loginUserSaga(action) {
  const token = action.payload;
  let decoded_token = token;

  if (decoded_token.email) {
    yield call(saveCookieData, decoded_token.exp, token);
    const userData = {
      firstName: decoded_token.firstName,
      lastName: decoded_token.lastName,
      userName: decoded_token.user_name,
      email: decoded_token.email,
    };
    yield put({
      type: LOGIN_USER_SUCCESS,
      payload: userData,
    });

    const options = {
      text: 'You have been successfully logged in',
      type: 'success',
    };

    yield put({
      type: SHOW_TOAST,
      payload: options,
    });
  }
}

export function* loginUserWatcher() {
  yield takeLatest(LOGIN_USER, loginUserSaga);
}
