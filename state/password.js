// @flow
import pbkdf2 from 'pbkdf2'
import { PBKDF2_ITERATIONS } from '~/constants/config'

let password = null

export const getPassword: () => string = () => {
  if (!password) throw new Error('Password not set')
  return password
}

export const setPassword: (pass: string) => void = pass => {
  password = pass
}

export const destroyPassword: () => void = () => {
  password = null
}

// Password is always hashed locally before being sent to server
export const hashPassword: (salt: string) => string = salt => {
  return pbkdf2
    .pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, 32, 'sha512')
    .toString('hex')
}
