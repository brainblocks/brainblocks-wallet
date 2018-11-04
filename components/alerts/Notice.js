// @flow
export const DEFAULT_TYPE = 'default'
export const SUCCESS_TYPE = 'success'
export const WARNING_ERROR = 'warning'
export const ERROR_TYPE = 'error'

export default ({ children, type = DEFAULT_TYPE }) => {
  const className = ['alert']

  switch (type) {
    case SUCCESS_TYPE:
      className.push('is-success')
      break
    case WARNING_ERROR:
      className.push('is-warning')
      break
    case ERROR_TYPE:
      className.push('is-error')
      break
  }

  return <div className={className.join(' ')}>{children}</div>
}
