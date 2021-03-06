import { POST_MAKE_TRANSFER_START, POST_MAKE_TRANSFER_SUCCESS, POST_MAKE_TRANSFER_FAILURE } from '../../contants';

const initialState = {
    data: {},
    isLoading: false,
};

const makeTransferReducer = function (state = initialState, action) {
    switch (action.type) {

        case POST_MAKE_TRANSFER_START: 
            return {
                ...state,
                isLoading: true,
            };
    
        case POST_MAKE_TRANSFER_SUCCESS: 
            return {
                ...state,
                data: action.payload,
                isLoading: false,
            };
        
        case POST_MAKE_TRANSFER_FAILURE: 
            return {
                ...state,
                isLoading: false,
            };
        
        default: {
            return state;
        }
    }
};

export default makeTransferReducer;