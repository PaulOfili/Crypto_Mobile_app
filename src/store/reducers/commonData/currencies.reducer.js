import {
    GET_CURRENCIES_START,
    GET_CURRENCIES_SUCCESS,
    GET_CURRENCIES_FAILURE,
  } from '../../contants';
  
  const initialState = {
    data: [],
    error: null,
    isLoading: false,
  };
  
  const currenciesReducer = function(state = initialState, action) {
    switch (action.type) {
      case GET_CURRENCIES_START: {
        return {
          ...state,
          error: null,
          isLoading: true
        };
      }
  
      case GET_CURRENCIES_SUCCESS: {
        return {
          ...state,
          data: action.payload,
          isLoading: false,
        };
      }

      case GET_CURRENCIES_FAILURE: {
        return {
          ...state,
          error: action.payload,
          isLoading: false,
        };
      }
      default: {
        return state;
      }
    }
  };
  
  export default currenciesReducer;
  