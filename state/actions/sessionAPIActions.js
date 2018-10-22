// @flow
import axios from 'axios'

const BASE_API_URL = 'http://localhost:8080/api'

export const API_SESSION_LOGIN = 'API::SESSION::LOGIN'

export async function login(next) {
  let response = await axios.post(`${BASE_API_URL}/user/login`)
}
