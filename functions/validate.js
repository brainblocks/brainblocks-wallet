// @flow
import { ACCOUNT_LABEL_MAX_CHARS } from '~/constants/config'
import { RaiFunctions } from 'rai-wallet'

export function isValidNanoAddress(address: string): boolean {
  return !!RaiFunctions.parseXRBAccount(address)
  /* This is the old regex version
  const re = /^(xrb|nano)_[13][13456789abcdefghijkmnopqrstuwxyz]{59}$/
  return re.test(address)
  */
}

export function isValidNanoSeed(seed: string): boolean {
  const re = /^[0-9A-Fa-f]{64}$/
  return re.test(seed)
}

export function isHex(str: string): boolean {
  return /^[0-9A-Fa-f]+$/.test(str)
}

export function isBcryptHash(str: string): boolean {
  return /^\$2[ayb]\$.{56}$/.test(str)
}

function isLettersAndNumbersOnly(str: string): boolean {
  return /^[0-9A-Za-z ]+$/.test(str)
}

export function isValidAccountName(str: string): boolean {
  return (
    str === '' ||
    (str.length <= ACCOUNT_LABEL_MAX_CHARS && isLettersAndNumbersOnly(str))
  )
}
