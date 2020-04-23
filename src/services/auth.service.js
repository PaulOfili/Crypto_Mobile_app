import { apiCall } from './apiUtility';
import * as API_URLS from './constants';

export function postSignUp(requestBody) {
    let url = API_URLS.SIGNUP_USER

    // return apiCall("POST", url, null, requestBody)

    console.log(url, requestBody)
    return fetch(url,  { 
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    })
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
    // return json.movies;
    })
    .catch((error) => {
    console.error(error);
    });
}

export function postLogin(requestBody) {
    let url = API_URLS.LOGIN_USER

    return apiCall("POST", url, null, requestBody)
}