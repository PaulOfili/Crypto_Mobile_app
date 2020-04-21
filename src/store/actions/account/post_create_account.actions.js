import { POST_CREATE_ACCOUNT } from '../../contants'

export const postCreateAccount = (data) => ({
    type: POST_CREATE_ACCOUNT,
    payload: data
});