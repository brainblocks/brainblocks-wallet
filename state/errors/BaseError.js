// @flow
export default class BaseError extends Error {
  message
  originalError

  constructor(error = {}) {
    super(error)
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
