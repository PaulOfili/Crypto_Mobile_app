const API_BASE_URL = 'https://rand.qa.interswitchng.com'
const VERSION = 'api/v1'
export const GET_BALANCE = `${API_BASE_URL}/${VERSION}/paple/balances`;
export const GET_BANKS = `${API_BASE_URL}/${VERSION}/paple/banks`;
export const SIGNUP_USER = `${API_BASE_URL}/${VERSION}/paple/user/signup`;
export const LOGIN_USER = `${API_BASE_URL}/${VERSION}/paple/user/login`;
export const CREATE_ACCOUNT = `${API_BASE_URL}/${VERSION}/paple/createaccount`;
export const GET_CURRENCIES = `${API_BASE_URL}/${VERSION}/paple/currencies`;
export const MAKE_TRANSFER = `${API_BASE_URL}/${VERSION}/paple/transfer`;
export const MAKE_WITHDRAW = `${API_BASE_URL}/${VERSION}/paple/withdraw`;
export const FUND_ACCOUNT = `${API_BASE_URL}/${VERSION}/paple/fund`;
export const CALCULATE_RATE = `${API_BASE_URL}/${VERSION}/paple/calculateRate`;
