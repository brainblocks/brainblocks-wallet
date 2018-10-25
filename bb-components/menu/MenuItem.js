// @flow
import * as React from 'react'

import { MenuItem as MUIMenuItem } from '@material-ui/core'
import { destyle } from 'destyle'

type Props = {
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

/**
 * MenuItem.
 */
export const MenuItem = ({ styles, children, ...rest }: Props) => {
  return <MUIMenuItem {...rest}>{children}</MUIMenuItem>
}

export default destyle(MenuItem, 'BB-MenuItem')
