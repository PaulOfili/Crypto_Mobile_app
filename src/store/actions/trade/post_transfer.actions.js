import { POST_MAKE_TRANSFER } from '../../contants'

export const postMakeTransfer = (data) => ({
    type: POST_MAKE_TRANSFER,
    payload: data
});