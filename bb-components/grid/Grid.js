// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import GridItem from './GridItem'

type GridProps = {
  /** Gutter width (px) */
  gutter?: number,
  /** Grid contents */
  children: React.ChildrenArray<React.Element<typeof GridItem>>,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

/**
 * Grid.
 */
export const Grid = ({ styles, gutter = 20, children, ...rest }: GridProps) => {
  return (
    <div className={styles.root} {...rest}>
      {children}
    </div>
  )
}

export default destyle(Grid, 'BB-Grid')
