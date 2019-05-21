// @flow
import zxcvbn from 'zxcvbn'

export function testPassword(password: string, username: string): Object {
  return zxcvbn(password, [username, 'brainblocks'])
}
