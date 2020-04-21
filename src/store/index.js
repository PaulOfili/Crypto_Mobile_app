import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
// import {throttle} from 'lodash';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer';

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});

const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

// store.subscribe(
//   throttle(() => {
//     saveStoreToSessionStorage({
//       auth: {
//         isLoggedIn: store.getState().auth.isLoggedIn,
//       },
//     });
//   }, 1000),
// );
export default store;
