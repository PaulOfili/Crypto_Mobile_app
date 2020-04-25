import {apiCall} from './apiUtility';
import * as API_URLS from './constants';

export function getBalance(email) {
  let url = `${API_URLS.GET_BALANCE}`;

  console.log('Balance', url);
  return apiCall('GET', url, null, null, {email});
  // return apiCall('GET', 'https://jsonplaceholder.typicode.com/todos/1', null, null);
  // return apiCall('GET', API_URLS.GET_BANKS, null, null);
}
