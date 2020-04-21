import {combineReducers} from 'redux';
import auth from './auth';
import account from './account';
import balance from './balance';
// import searchReport from './searchReport'

const rootReducer = combineReducers({
  auth,
  account,
  balance,
});

export default rootReducer;
