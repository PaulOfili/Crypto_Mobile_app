import { put, takeLatest, call } from 'redux-saga/effects';
// import searchReportService from '../../../services/searchReport.service';
import { submitSearchReport } from '../../../services/searchReport.service';


import {
    POST_SUBMIT_REPORT,
    LOAD_CONFIRM_MODAL,
    HIDE_CONFIRM_MODAL,
    SHOW_TOAST,
    POST_SUBMIT_REPORT_ERROR,
    POST_SUBMIT_REPORT_SUCCESS,
}
    from "../../contants";
function* postSubmitReport(action) {
    yield put({
        type: LOAD_CONFIRM_MODAL
    })

    try {        

        const response = yield call(submitSearchReport, action.requestId, action.payload)
        console.log(response);
        yield put({
            type: POST_SUBMIT_REPORT_SUCCESS,
        });

        yield put({
            type: HIDE_CONFIRM_MODAL
        })

        const options = {
            text: 'You have successfully submitted this report',
            type: 'success'
        }

        yield put({
            type: SHOW_TOAST,
            payload: options
        });  
  
    } catch (error) {
        yield put({
            type: POST_SUBMIT_REPORT_ERROR
        });

        yield put({
            type: HIDE_CONFIRM_MODAL
        })

        const options = {
            text: error.message,
            type: 'error'
        }

        yield put({
            type: SHOW_TOAST,
            payload: options
        });
    }
}

export function* postSubmitReportWatcher() {
    yield takeLatest([POST_SUBMIT_REPORT], postSubmitReport);
}