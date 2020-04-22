import { POST_MAKE_WITHDRAW } from '../../contants'

export const postMakeWithdraw = (data) => ({
    type: POST_MAKE_WITHDRAW,
    payload: data
});