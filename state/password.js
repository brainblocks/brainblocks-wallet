import pbkdf2 from 'pbkdf2'
import { PBKDF2_ITERATIONS } from '~/constants'

export let password = null

export const setPassword = pass => {
  password = pass
}

export const destroyPassword = () => {
  password = null
}

// Password is always hashed locally before being sent to server
export const hashPassword = salt => {
  return pbkdf2
    .pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, 32, 'sha512')
    .toString('hex')
}
