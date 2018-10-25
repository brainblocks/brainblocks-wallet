// @flow
import * as React from 'react'

import { Menu as MUIMenu } from '@material-ui/core'
import { destyle } from 'destyle'

type Props = {
  /** Menu contents */
  children?: React.Node,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

/**
 * Menu.
 */
export const Menu = ({ styles, children, ...rest }: Props) => {
  return <MUIMenu {...rest}>{children}</MUIMenu>
}

export default destyle(Menu, 'BB-Menu')
