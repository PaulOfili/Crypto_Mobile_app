import {apiCall} from './apiUtility';
import * as API_URLS from './constants';

export function getCurrencies() {
  let url = `${API_URLS.GET_CURRENCIES}`;

  return apiCall('GET', url, null, null);
}

export function getBanks() {
  let url = `${API_URLS.GET_BANKS}`;

  return apiCall('GET', url, null, null);
}

