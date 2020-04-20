import {put, call, takeLatest} from 'redux-saga/effects';
import {LOGIN_USER, LOGIN_USER_SUCCESS, SHOW_TOAST} from '../../contants';
// import {saveCookieData} from '../../../session/cookies';

export function* loginUserSaga(action) {
  const userToken = action.payload;
    console.log('yeah')
    // yield call(saveCookieData, decoded_token.exp, token);
    const userData = {
      firstName: 'Paul',
      email: 'p@g.com',
    };

    const userDetails = {
      userData,
      userToken
    }

    yield put({
      type: LOGIN_USER_SUCCESS,
      payload: userDetails,
    });

}

export function* loginUserWatcher() {
  yield takeLatest(LOGIN_USER, loginUserSaga);
}
