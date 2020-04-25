import {put, call, takeLatest} from 'redux-saga/effects';
import {
  LOGIN_USER, 
  LOGIN_USER_START, 
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  SIGNUP_USER,
  SIGNUP_USER_START,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE
} from '../../contants';
import { postSignUp, postLogin } from '../../../services/auth.service'
import { Alert } from 'react-native';
// LOGIN SAGA
export function* loginUserWorker(action) {
  
  yield put({
    type: LOGIN_USER_START,
  });

  
  try {

    const requestBody = action.payload;
    const response = yield call(postLogin, requestBody);
    console.log(response)

    const userData = {
      firstName: 'Paul',
      // email: requestBody.email,
      email: 'demi.babajide@gmail.com',
    };
  
    yield put({
      type: LOGIN_USER_SUCCESS,
      payload: userData,
    });

  } catch(error) {

    yield put({
      type: LOGIN_USER_FAILURE,
    });
    
    Alert.alert(error)
    console.log(error)
  }

}

export function* loginUserWatcher() {
  yield takeLatest(LOGIN_USER, loginUserWorker);
}
