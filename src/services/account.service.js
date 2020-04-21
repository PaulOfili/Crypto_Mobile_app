import { apiCall } from './apiUtility';
import * as API_URLS from './constants';

export function postCreateAccount(requestBody) {
    let url = API_URLS.CREATE_ACCOUNT

    return apiCall("POST", url, null, requestBody)
}