import {apiCall} from './apiUtility';
import * as API_URLS from './constants';

export function getCurrency() {
  let url = `${API_URLS.GET_CURRENCY}`;

  return apiCall('GET', url, null, null, {email: 'demi.babajide@gmail.com'});
}

export function getBank() {
  let url = `${API_URLS.GET_BANK}`;

  return apiCall('GET', url, null, null, {email: 'demi.babajide@gmail.com'});
}

