import { combineReducers } from 'redux';
import transfer from './transfer.reducer';
import withdraw from './withdraw.reducer';
import fund from './fund.reducer';

const trade = combineReducers({
    transfer,
    withdraw,
    fund,
  });

export default trade;