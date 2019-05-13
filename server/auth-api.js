const axios = require('axios')

const BASE_API_URL = process.env.BASE_API_URL

module.exports.login = async function(params) {
  const response = await axios({
    method: 'post',
    baseURL: BASE_API_URL,
    url: '/auth',
    data: params
  })

  return response
}

module.exports.register = async function(params) {
  const response = await axios({
    method: 'post',
    baseURL: BASE_API_URL,
    url: '/users',
    data: params
  })

  return response
}
