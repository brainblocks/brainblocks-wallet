// @flow
import * as React from 'react'

import {
  FormControl as MUIFormControl,
  MenuItem as MUIMenuItem,
  Select as MUISelect
} from '@material-ui/core'

import { destyle } from 'destyle'

type Props = {
  /** Change handler for field */
  onChange: (SyntheticEvent<>) => mixed,
  /** Component must always be controlled */
  value: string,
  options: Array<{ value: mixed, title: string }>,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

/**
 * Select.
 */
export const Select = ({
  styles,
  options,
  onChange,
  value,
  ...rest
}: Props) => {
  return (
    <MUIFormControl>
      <MUISelect
        MenuProps={{
          getContentAnchorEl: null,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
          }
        }}
        classes={{
          root: styles.root,
          select: styles.select
        }}
        value={value}
        onChange={onChange}
        {...rest}
      >
        {options.map(opt => (
          <MUIMenuItem key={opt.value} value={opt.value}>
            <span className={styles.item}>{opt.title}</span>
          </MUIMenuItem>
        ))}
      </MUISelect>
    </MUIFormControl>
  )
}

export default destyle(Select, 'BB-Select')
