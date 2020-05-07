import {put, call, takeLatest} from 'redux-saga/effects';
import {
  LOGIN_USER, 
  LOGIN_USER_START, 
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from '../../contants';
import { postLogin } from '../../../services/auth.service'
import { Alert } from 'react-native';
// LOGIN SAGA
export function* loginUserWorker(action) {
  
  yield put({
    type: LOGIN_USER_START,
  });

  try {

    const requestBody = action.payload;
    const response = yield call(postLogin, requestBody);

    const userData = {
      firstName: response.firstName,
      lastName: response.lastName,
      email: requestBody.email,
    };
  
    yield put({
      type: LOGIN_USER_SUCCESS,
      payload: userData,
    });

  } catch(error) {

    yield put({
      type: LOGIN_USER_FAILURE,
    });

    Alert.alert(error.message)
  }

}

export function* loginUserWatcher() {
  yield takeLatest(LOGIN_USER, loginUserWorker);
}
