import { POST_SUBMIT_REPORT } from '../../contants';

export const postSubmitReport = (requestId, data) => ({
    type: POST_SUBMIT_REPORT,
    payload: data,
    requestId,
});
