// @flow
import BaseError from './BaseError'

export default class UnauthorizedError extends BaseError {
  constructor(error = {}) {
    super(error)

    let message = undefined

    if (error.response && error.response.data) {
      message = error.response.data.error
    }

    this.message = message || 'Bad Request'
  }
}
