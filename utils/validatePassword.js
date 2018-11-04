// @flow
import { isString } from 'lodash'
export default (password: string): string => {
  if (!password) {
    return 'Please enter a password'
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters'
  }

  return undefined
}
