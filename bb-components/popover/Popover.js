// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import { cx } from 'emotion'
import MUIPopover from '@material-ui/core/Popover'

type Props = {
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

export const Popover = ({ styles, ...rest }: Props) => (
  <MUIPopover classes={{ paper: cx(styles.root) }} {...rest} />
)

export default destyle(Popover, 'BB-Popover')
