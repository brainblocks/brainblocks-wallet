// @flow
import * as React from 'react'
import { destyle } from 'destyle'

import { Popover as MUIPopover } from '@material-ui/core'
import toRenderProps from 'recompose/toRenderProps'
import withState from 'recompose/withState'

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null))

type Props = {
  /** Classes to pass into popoevr */
  classes: string,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

/**
 * Popover.
 */
export const Popover = ({ styles, classes, ...rest }: Props) => {
  return (
    <WithState>
      {({ anchorEl, updateAnchorEl }) => {
        const open = Boolean(anchorEl)
        return (
          <React.Fragment>
            <Button
              aria-owns={open ? 'render-props-popover' : null}
              aria-haspopup="true"
              variant="contained"
              onClick={event => {
                updateAnchorEl(event.currentTarget)
              }}
            >
              Open Popover
            </Button>
            <MUIPopover
              id="render-props-popover"
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
              The content of the Popover.
            </MUIPopover>
          </React.Fragment>
        )
      }}
    </WithState>
  )
}

export default destyle(Popover, 'BB-Popover')
