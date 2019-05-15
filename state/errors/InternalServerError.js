// @flow
import BaseError from './BaseError'

export default class InternalServerError extends BaseError {
  constructor(error: Error) {
    super(error)
    this.message = 'Internal Server Error'
  }
}
