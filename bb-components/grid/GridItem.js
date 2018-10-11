// @flow
import * as React from 'react'
import { destyle } from 'destyle'

type GridItemProps = {
  /** Columns / 12. Mobile and up. Overridden by more specific spans if screen size matches. */
  span?: number,
  /** \>= 480px */
  spanMobile?: number,
  /** \>= 640px */
  spanSm?: number,
  /** \>= 768px */
  spanTablet?: number,
  /** \>= 1020px */
  spanDesktop?: number,
  /** \>= 1280px */
  spanLg?: number,
  /** Grid item contents */
  children: React.Node,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

/**
 * Grid Item.
 */
export const GridItem = ({
  span = 12,
  spanMobile,
  spanSm,
  spanTablet,
  spanDesktop,
  spanLg,
  children,
  styles,
  ...rest
}: GridItemProps) => {
  return (
    <div className={styles.item} {...rest}>
      {children}
    </div>
  )
}

export default destyle(GridItem, 'BB-Grid')
