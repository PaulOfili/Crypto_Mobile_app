import { apiCall } from './apiUtility';
import * as API_URLS from './constants';

export function postMakeTransfer(requestBody) {
    let url = API_URLS.MAKE_TRANSFER

    return apiCall("POST", url, null, requestBody, null)
}

export function calculateRate(requestParams) {
    let url = API_URLS.CALCULATE_RATE

    return apiCall("GET", url, null, null, requestParams)
}

export function postMakeWithdraw(requestBody) {
    let url = API_URLS.MAKE_WITHDRAW

    return apiCall("POST", url, null, requestBody, null)
}

export function postFundAccount(requestBody) {
    let url = API_URLS.FUND_ACCOUNT;

    return apiCall("POST", url, null, requestBody, null)
}