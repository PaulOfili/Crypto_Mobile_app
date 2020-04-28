import {combineReducers} from 'redux';
import auth from './auth';
import account from './account';
import balance from './balance';
import commonData from './commonData'
import trade from './trade';

const rootReducer = combineReducers({
  auth,
  account,
  balance,
  commonData,
  trade
});

export default rootReducer;
