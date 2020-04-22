import { combineReducers } from 'redux';
import banks from './banks.reducer';
import currencies from './currencies.reducer';

const commonData = combineReducers({
    banks,
    currencies,
  });

export default commonData;
