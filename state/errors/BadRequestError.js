// @flow
import BaseError from './BaseError'

export default class BadRequestError extends BaseError {
  constructor(error: Error) {
    super(error)

    let message = undefined

    if (
      error.hasOwnProperty('response') &&
      // $FlowFixMe
      error.response.hasOwnProperty('data')
    ) {
      // $FlowFixMe
      message = error.response.data.error
    }

    this.message = message || 'Bad Request'
  }
}
