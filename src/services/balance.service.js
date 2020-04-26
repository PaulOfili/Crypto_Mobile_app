import {apiCall} from './apiUtility';
import * as API_URLS from './constants';

export function getBalance(email) {
  let url = `${API_URLS.GET_BALANCE}`;

  return apiCall('GET', url, null, null, {email});
}
