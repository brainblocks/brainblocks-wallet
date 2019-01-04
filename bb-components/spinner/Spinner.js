// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import { cx } from 'emotion'
import CircularProgress from '@material-ui/core/CircularProgress'

type Props = {
  /** Colour - a hex colour or a named theme colour. Only used by destyle. */
  color: string,
  /** Size (and any other MaterialUI CircularProgress props) */
  size?: number,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

export const Spinner = ({ styles, ...rest }: Props) => (
  <CircularProgress
    classes={{
      root: styles.root
    }}
    className={styles.root}
    {...rest}
  />
)

export default destyle(Spinner, 'BB-Spinner')
