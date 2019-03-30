if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
export const BASE_API_URL = process.env.BASE_API_URL
export const PRICE_API_URL = 'https://api.brainblocks.io/api/exchange/rates'
export const LOCAL_STORAGE_AUTH_TOKEN_KEY = '__bb_auth_token__'
export const TRANSACTIONS_PER_PAGE = 12
