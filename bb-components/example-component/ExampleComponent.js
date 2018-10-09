// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import { destyle } from 'destyle'

type Props = {
  /** Click handler for button */
  onClick?: (SyntheticEvent<>) => mixed,
  /** Button contents */
  children: React.Node,
  type?: 'primary' | 'secondary',
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

/**
 * ExampleComponent.
 */
export const ExampleComponent = ({
  styles,
  onClick,
  children,
  type = 'secondary',
  ...rest
}: Props) => {
  return (
    <button className={styles.root} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}

export default destyle(ExampleComponent, 'BB-Example')
