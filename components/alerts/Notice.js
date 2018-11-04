// @flow
export const DEFAULT_ALERT = 'default'
export const SUCCESS_ALERT = 'success'
export const WARNING_ERROR = 'warning'
export const ERROR_ALERT = 'error'

export default ({ children, type = NEUTRAL_ALERT }) => {
  className = ['alert']

  switch (type) {
    case SUCCESS_ALERT:
      className.push('is-success')
      break
    case WARNING_ERROR:
      className.push('is-warning')
      break
    case ERROR_ALERT:
      className.push('is-error')
      break
  }

  return <div className={className.join(' ')}>{children}</div>
}
