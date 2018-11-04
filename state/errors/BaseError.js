// @flow
export default class BaseError {
  message
  originalError

  constructor(error = {}) {
    this.originalError = error
    this.message = error.message || 'An Error Occurred'
  }

  toString() {
    return this.message
  }

  serialize() {
    return { message: this.message }
  }
}
