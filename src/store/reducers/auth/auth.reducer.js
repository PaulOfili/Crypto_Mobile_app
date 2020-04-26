import { LOGIN_USER_SUCCESS, LOGOUT_USER, LOGIN_USER_START, LOGIN_USER_FAILURE } from '../../contants';

const initialState = {
    userData: {},
    isLoading: false,
    isLoggedIn: false
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_START:
            return {
                ...state,
                isLoading: true
            } 

        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                userData: action.payload,
                isLoggedIn: true,
                isLoading: false
            }
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                isLoading: false
            }

        case LOGOUT_USER:
            return {
                ...state,
                userData: {},
                isLoggedIn: false,
                isLoading: false
            }
            
        default:
            return state;
    }
}

export default authReducer;