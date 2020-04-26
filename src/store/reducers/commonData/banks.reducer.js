import {
    GET_BANKS_START,
    GET_BANKS_FAILURE,
    GET_BANKS_SUCCESS,
  } from '../../contants';
  
  const initialState = {
    data: [],
    error: null,
    isLoading: false,
    loadingBarProgress: 0
  };
  
  const banksReducer = function(state = initialState, action) {
    switch (action.type) {
      case GET_BANKS_START: {

        return {
          ...state,
          isLoading: true,
          loadingBarProgress: 0
        };
      }
  
      case GET_BANKS_SUCCESS: {
        return {
          ...state,
          data: action.payload,
          isLoading: false,
          loadingBarProgress: 100
        };
      }
      case GET_BANKS_FAILURE: {
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
  
  export default banksReducer;
  