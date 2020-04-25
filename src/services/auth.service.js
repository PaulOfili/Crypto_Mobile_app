import { apiCall } from './apiUtility';
import * as API_URLS from './constants';

export function postLogin(requestBody) {
    let url = API_URLS.LOGIN_USER

    return apiCall("POST", url, null, requestBody)
}