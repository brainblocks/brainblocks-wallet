// @flow
export default class BaseError extends Error {
  message: string
  originalError: Error

  constructor(error: Error) {
    super(error)
    this.originalError = error
    this.message = error.message || 'An Error Occurred'
  }

  toString(): string {
    return this.message
  }

  serialize(): { message: string } {
    return { message: this.message }
  }
}
