import { LOGIN_USER_SUCCESS, LOGOUT_USER, LOGIN_USER_START } from '../../contants';

const initialState = {
    userToken: null,
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
                isLoggedIn: true,
                userToken: action.payload.userToken,
                userData: action.payload.userData,
                isLoading: false
            }

        case LOGOUT_USER:
            return {
                ...state,
                userData: {},
                userToken: null,
                isLoggedIn: false,
                isLoading: false
            }
            
        default:
            return state;
    }
}

export default authReducer;