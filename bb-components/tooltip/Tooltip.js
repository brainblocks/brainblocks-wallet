// @flow
import * as React from 'react'

import { Tooltip as MUITooltip } from '@material-ui/core'
import { destyle } from 'destyle'

type Props = {
  /** Tooltip contents */
  children?: React.Node,
  styles: Object
}

/**
 * Tooltip.
 */
export const Tooltip = ({ styles, children, ...rest }: Props) => {
  return (
    <MUITooltip className={styles.root} {...rest}>
      {children}
    </MUITooltip>
  )
}

export default destyle(Tooltip, 'BB-Tooltip')
