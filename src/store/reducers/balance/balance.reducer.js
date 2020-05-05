import {
  GET_BALANCE_START,
  GET_BALANCE_FAILURE,
  GET_BALANCE_SUCCESS,
} from '../../contants';

const initialState = {
  data: {},
  error: null,
  isLoading: false,
};

const balanceReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_BALANCE_START: {
      return {
        ...state,
        isLoading: true,
        data: {},
        error: null
      };
    }

    case GET_BALANCE_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    }
    case GET_BALANCE_FAILURE: {
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

export default balanceReducer;
