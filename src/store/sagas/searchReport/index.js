import { all } from 'redux-saga/effects';
import { postSubmitReportWatcher } from './post_submit_report.saga';


export default function* searchReportSaga() {
    yield all([
        postSubmitReportWatcher()
    ])
}