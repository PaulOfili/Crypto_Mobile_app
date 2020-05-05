import {
    GET_BANKS_START,
    GET_BANKS_FAILURE,
    GET_BANKS_SUCCESS,
  } from '../../contants';
  
  const initialState = {
    data: {},
    error: null,
    isLoading: false,
  };
  
  const banksReducer = function(state = initialState, action) {
    switch (action.type) {
      case GET_BANKS_START: {

        return {
          ...state,
          data: {},
          error: null,
          isLoading: true,
        };
      }
  
      case GET_BANKS_SUCCESS: {
        return {
          ...state,
          data: action.payload,
          isLoading: false,
        };
      }
      case GET_BANKS_FAILURE: {
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
  
  export default banksReducer;
  