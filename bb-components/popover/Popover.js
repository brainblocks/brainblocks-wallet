// @flow
import * as React from 'react'

import Button from '../button/Button'
import { Popover as MUIPopover } from '@material-ui/core'
import { destyle } from 'destyle'
import toRenderProps from 'recompose/toRenderProps'
import uuid from 'uuid/v4'
import withState from 'recompose/withState'

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null))

type Props = {
  /** Classes to pass into popover */
  classes: string,
  /** Text on button for popover */
  btnText: string,
  /** Popover contents */
  children: React.Node,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

/**
 * Popover.
 */
export const Popover = ({
  styles,
  children,
  classes,
  btnText,
  ...rest
}: Props) => {
  return (
    <WithState>
      {({ anchorEl, updateAnchorEl }) => {
        const open = Boolean(anchorEl)
        const popoverUuid = uuid()
        return (
          <React.Fragment>
            <Button
              aria-owns={open ? popoverUuid : null}
              aria-haspopup="true"
              onClick={event => {
                updateAnchorEl(event.currentTarget)
              }}
            >
              {btnText}
            </Button>
            <MUIPopover
              id={popoverUuid}
              open={open}
              anchorEl={anchorEl}
              onClose={() => {
                updateAnchorEl(null)
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
              {...rest}
            >
              {children}
            </MUIPopover>
          </React.Fragment>
        )
      }}
    </WithState>
  )
}

export default destyle(Popover, 'BB-Popover')
