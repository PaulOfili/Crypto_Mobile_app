import { POST_MAKE_WITHDRAW_START, POST_MAKE_WITHDRAW_SUCCESS, POST_MAKE_WITHDRAW_FAILURE } from '../../contants';

const initialState = {
    data: {},
    isLoading: false,
};

const makeWithdrawReducer = function (state = initialState, action) {
    switch (action.type) {

        case POST_MAKE_WITHDRAW_START: 
            return {
                ...state,
                isLoading: true,
            };
    
        case POST_MAKE_WITHDRAW_SUCCESS: 
            return {
                ...state,
                data: action.payload,
                isLoading: false,
            };
        
        case POST_MAKE_WITHDRAW_FAILURE: 
            return {
                ...state,
                isLoading: false,
            };
        
        default: {
            return state;
        }
    }
};

export default makeWithdrawReducer;