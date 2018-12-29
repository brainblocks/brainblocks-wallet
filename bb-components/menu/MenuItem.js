// @flow
import * as React from 'react'

import { MenuItem as MUIMenuItem } from '@material-ui/core'
import { cx } from 'emotion'
import { destyle } from 'destyle'

type Props = {
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

/**
 * MenuItem.
 */
export const MenuItem = ({
  styles,
  destyleMerge,
  children,
  ...rest
}: Props) => {
  return (
    <MUIMenuItem
      classes={{
        root: cx(styles.root),
        selected: cx(styles.selected)
      }}
      {...rest}
    >
      {children}
    </MUIMenuItem>
  )
}

export default destyle(MenuItem, 'BB-MenuItem')
