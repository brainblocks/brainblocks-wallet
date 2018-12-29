// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import { SnackbarProvider } from 'notistack'
import CheckIcon from '~/static/svg/icons/alert-check.svg'
import ExclaimIcon from '~/static/svg/icons/alert-exclaim.svg'
import InfoIcon from '~/static/svg/icons/alert-info.svg'
import CrossIcon from '~/static/svg/icons/alert-cross.svg'

type Props = {
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

export const Snackbar = ({ styles, children, ...rest }: Props) => (
  <SnackbarProvider
    maxSnack={3}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    classes={{
      root: styles.root,
      variantSuccess: styles.success,
      variantError: styles.error,
      variantWarning: styles.warning,
      variantInfo: styles.info
    }}
    iconVariant={{
      success: (
        <div className={styles.iconSuccess}>
          <CheckIcon />
        </div>
      ),
      error: (
        <div className={styles.iconError}>
          <CrossIcon />
        </div>
      ),
      warning: (
        <div className={styles.iconWarning}>
          <ExclaimIcon />
        </div>
      ),
      info: (
        <div className={styles.iconInfo}>
          <InfoIcon />
        </div>
      )
    }}
  >
    {children}
  </SnackbarProvider>
)

export default destyle(Snackbar, 'BB-Snackbar')
