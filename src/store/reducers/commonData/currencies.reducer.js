import {
    GET_CURRENCIES_START,
    GET_CURRENCIES_SUCCESS,
    GET_CURRENCIES_FAILURE,
  } from '../../contants';
  
  const initialState = {
    data: [],
    error: null,
    isLoading: false,
    loadingBarProgress: 0
  };
  
  const currenciesReducer = function(state = initialState, action) {
    switch (action.type) {
      case GET_CURRENCIES_START: {
        return {
          ...state,
          isLoading: true,
          loadingBarProgress: 0
        };
      }
  
      case GET_CURRENCIES_SUCCESS: {
        return {
          ...state,
          data: action.payload,
          isLoading: false,
          loadingBarProgress: 100
        };
      }

      case GET_CURRENCIES_FAILURE: {
        return {
          ...state,
          error: action.payload,
          isLoading: false,
          loadingBarProgress: 100
        };
      }
      default: {
        return state;
      }
    }
  };
  
  export default currenciesReducer;
  