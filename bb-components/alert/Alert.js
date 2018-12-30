// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import CheckIcon from '~/static/svg/icons/alert-check.svg'
import ExclaimIcon from '~/static/svg/icons/alert-exclaim.svg'
import InfoIcon from '~/static/svg/icons/alert-info.svg'
import CrossIcon from '~/static/svg/icons/alert-cross.svg'

type Props = {
  /** Alert contents */
  children?: string | React.Node,
  /** Only used for styling */
  variant?: 'success' | 'error' | 'warning' | 'info',
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

/**
 * Alert.
 */
export const Alert = ({
  styles,
  children,
  variant = 'info',
  ...rest
}: Props) => {
  let Icon = InfoIcon
  switch (variant) {
    case 'success':
      Icon = CheckIcon
      break
    case 'error':
      Icon = CrossIcon
      break
    case 'warning':
      Icon = ExclaimIcon
      break
    default:
      break
  }
  return (
    <div className={styles.root} {...rest}>
      <div className={styles.icon}>
        <Icon />
      </div>
      <div className={styles.message}>{children}</div>
    </div>
  )
}

export default destyle(Alert, 'BB-Alert')
