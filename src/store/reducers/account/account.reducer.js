import { POST_CREATE_ACCOUNT, POST_CREATE_ACCOUNT_SUCCESS, POST_CREATE_ACCOUNT_FAILURE } from '../../contants';

const initialState = {
    data: {},
    isLoading: false,
};

const createAccountReducer = function (state = initialState, action) {
    switch (action.type) {

        case POST_CREATE_ACCOUNT: 
            return {
                ...state,
                isLoading: true,
            };
    
        case POST_CREATE_ACCOUNT_SUCCESS: 
            return {
                ...state,
                data: action.payload,
                isLoading: false,
            };
        
        case POST_CREATE_ACCOUNT_FAILURE: 
            return {
                ...state,
                isLoading: false,
            };
        
        default: {
            return state;
        }
    }
};

export default createAccountReducer;