import { LOGIN_USER, LOGOUT_USER }from '../../contants';

export const loginUser = (data) => {
    return {
        type: LOGIN_USER,
        payload: data
    };
};

export const logoutUser = () => {
    return {
        type: LOGOUT_USER,
    }
}