import { POST_FUND_ACCOUNT } from '../../contants'

export const postFundAccount = (data) => ({
    type: POST_FUND_ACCOUNT,
    payload: data
});