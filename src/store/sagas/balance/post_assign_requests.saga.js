import {put, takeLatest, delay} from 'redux-saga/effects';
// import {SHOW_TOAST} from "../../actions/toast";
import {
  POST_ASSIGN_REQUESTS,
  LOAD_CONFIRM_MODAL,
  HIDE_CONFIRM_MODAL,
  SHOW_TOAST,
  POST_ASSIGN_REQUESTS_ERROR,
  POST_ASSIGN_REQUESTS_SUCCESS,
} from '../../contants';
function* postAssignRequests(action) {
  try {

    yield put({
      type: LOAD_CONFIRM_MODAL,
    });

    yield delay(2000);

    if (Math.ceil(Math.random() * 10) % 2 === 0) {
      yield put({
        type: POST_ASSIGN_REQUESTS_SUCCESS,
      });

      yield put({
        type: HIDE_CONFIRM_MODAL,
      });

      const options = {
        text: 'You have been assigned those search requests',
        type: 'success',
      };

      yield put({
        type: SHOW_TOAST,
        payload: options,
      });
    } else {
      yield put({
        type: POST_ASSIGN_REQUESTS_ERROR,
      });

      yield put({
        type: HIDE_CONFIRM_MODAL,
      });

      const options = {
        text: 'Sorry, something went wrong. Try again later',
        type: 'error',
      };

      yield put({
        type: SHOW_TOAST,
        payload: options,
      });
    }
  } catch (error) {
    yield put({
      type: POST_ASSIGN_REQUESTS_ERROR,
    });

    const options = {
      text: error.message,
      type: 'error',
    };

    yield put({
      type: SHOW_TOAST,
      payload: options,
    });
  }
}

export function* postAssignRequestsWatcher() {
  yield takeLatest([POST_ASSIGN_REQUESTS], postAssignRequests);
}
