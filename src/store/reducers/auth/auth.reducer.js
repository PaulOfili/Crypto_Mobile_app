import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGOUT_USER } from '../../contants';

const initialState = {
    userData: {},
    isLoading: false,
    isLoggedIn: true
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return (
                Object.assign({}, state, {
                    isLoading: true
                })
            )
        case LOGIN_USER_SUCCESS:
            return (
                Object.assign({}, state, {
                    isLoggedIn: true,
                    userData: action.payload,
                    isLoading: false
                })
            )
        case LOGOUT_USER:
            return (
                Object.assign({}, state, {
                    userData: {},
                    isLoggedIn: false,
                    isLoading: false
                })
            )
        default:
            return state;
    }
}

export default authReducer;