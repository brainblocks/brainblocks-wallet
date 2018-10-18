// @flow
import * as React from 'react'
import { destyle } from 'destyle'

type Props = {
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object,
  /** Used by destyle */
  pad?: boolean,
  background?: boolean | string,
  children: React.Node
}

const PageContent = ({
  pad = false,
  background,
  styles,
  children,
  ...rest
}: Props) => {
  return (
    <div className={styles.root} {...rest}>
      <div className={styles.pageWidth}>
        <div className={styles.inner}>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default destyle(PageContent, 'PageContent')
