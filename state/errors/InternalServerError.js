// @flow
import BaseError from './BaseError'

export default class InternalServerError extends BaseError {
  constructor(error = {}) {
    super(error)
    this.message = 'Internal Server Error'
  }
}
