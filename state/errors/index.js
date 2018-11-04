import BadRequestError from './BadRequestError'
import InternalServerError from './InternalServerError'
import GenericError from './GenericError'

export function deduceError(error) {
  // Is this some kind of request error
  if (error.response) {
    if (error.response.status === 400) {
      return new BadRequestError(error)
    }

    return new InternalServerError(error)
  }

  return new GenericError(error)
}
