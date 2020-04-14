import {combineReducers} from 'redux';
import auth from './auth';
import balance from './balance';
// import searchReport from './searchReport'

const rootReducer = combineReducers({
  auth,
  balance,
});

export default rootReducer;
