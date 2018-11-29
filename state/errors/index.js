import BadRequestError from './BadRequestError'
import UnauthorizedError from './UnauthorizedError'
import InternalServerError from './InternalServerError'
import GenericError from './GenericError'

export function deduceError(error) {
  // Is this some kind of request error
  if (error.response) {
    switch (error.response.status) {
      case 400:
        return new BadRequestError(error)
      case 401:
        return new UnauthorizedError(error)
    }

    return new InternalServerError(error)
  }

  return new GenericError(error)
}