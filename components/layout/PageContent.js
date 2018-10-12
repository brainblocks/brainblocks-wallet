// @flow
import * as React from 'react'
import { destyle } from 'destyle'

type Props = {
  /** Page title */
  title?: string,
  /** Whether to indent the title */
  indentTitle: false,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object,
  /** Used by destyle */
  pad?: false,
  background?: false,
  children: React.Node
}

const PageContent = ({
  title,
  indentTitle = false,
  pad = false,
  background = false,
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
