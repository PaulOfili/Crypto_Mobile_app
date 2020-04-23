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
// LOGIN SAGA
export function* loginUserWorker(action) {
  
  yield put({
    type: LOGIN_USER_START,
  });

  // const userData = action.payload;
  
  try {
    // const response = yield call(postLogin, userData);
  
    const userData = {
      firstName: 'Paul',
      email: 'p@g.com',
    };
  
    const data = {
      userData
    }
    yield put({
      type: LOGIN_USER_SUCCESS,
      payload: data,
    });

  } catch(error) {
    console.log(error)
  }

}

export function* loginUserWatcher() {
  yield takeLatest(LOGIN_USER, loginUserWorker);
}

// SIGN UP SAGA
export function* signUpUserWorker(action) {
  
  yield put({
    type: SIGNUP_USER_START,
  });

  const userData = action.payload;
  console.log(userData)
  try{
    const response = yield call(postSignUp, userData);
  
    console.log(response)
  
    yield put({
      type: SIGNUP_USER_SUCCESS,
      payload: 'Success',
    });

  } catch (error) {
    console.log(error)
  }

}

export function* signUpUserWatcher() {
  yield takeLatest(SIGNUP_USER, signUpUserWorker);
}
