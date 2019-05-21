// @flow
import * as React from 'react'
import ReactGA from 'react-ga'
import Alert from 'brainblocks-components/build/Alert'
import { destyle } from 'destyle'

type Props = {
  /** Page title */
  title?: string,
  /** Whether to indent the title */
  indentTitle: false,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object,
  children: React.Node
}

const PageHeader = ({
  title,
  indentTitle = false,
  styles,
  children,
  ...rest
}: Props) => {
  return (
    <div className={styles.root} {...rest}>
      <div className={styles.pageWidth}>
        <Alert destyleMerge={{ root: styles.alert, icon: styles.alertIcon }}>
          We&apos;re in beta! Please test with small amounts of Nano, and leave
          us lots of{' '}
          <ReactGA.OutboundLink
            eventLabel="Feedback"
            to="https://brainblockshelp.freshdesk.com/support/tickets/new"
            target="_blank"
          >
            feedback
          </ReactGA.OutboundLink>
          .
        </Alert>
        <div className={styles.inner}>
          {!!title && <h1 className={styles.title}>{title}</h1>}
          {!!children && <div className={styles.content}>{children}</div>}
        </div>
      </div>
    </div>
  )
}

export default destyle(PageHeader, 'PageHeader')
