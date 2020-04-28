import { POST_FUND_ACCOUNT_START, POST_FUND_ACCOUNT_SUCCESS, POST_FUND_ACCOUNT_FAILURE } from '../../contants';

const initialState = {
    data: {},
    isLoading: false,
};

const fundAccountReducer = function (state = initialState, action) {
    switch (action.type) {

        case POST_FUND_ACCOUNT_START: 
            return {
                ...state,
                isLoading: true,
            };
    
        case POST_FUND_ACCOUNT_SUCCESS: 
            return {
                ...state,
                data: action.payload,
                isLoading: false,
            };
        
        case POST_FUND_ACCOUNT_FAILURE: 
            return {
                ...state,
                isLoading: false,
            };
        
        default: {
            return state;
        }
    }
};

export default fundAccountReducer;