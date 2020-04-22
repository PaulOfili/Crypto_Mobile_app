import {combineReducers} from 'redux';
import auth from './auth';
import account from './account';
import balance from './balance';
import commonData from './commonData'


const rootReducer = combineReducers({
  auth,
  account,
  balance,
  commonData
});

export default rootReducer;
