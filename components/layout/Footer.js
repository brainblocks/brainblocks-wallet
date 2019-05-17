// @flow
import React from 'react'
import { destyle } from 'destyle'

type Props = {
  styles: Object,
  variant: ?string
}

// $FlowFixMe -> https://github.com/facebook/flow/issues/2093
const Footer = ({ styles, variant = 'full', ...rest }: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.pageWidth}>
        <div className={styles.inner}>
          {variant === 'bare' && <>&nbsp;</>}
          {variant === 'full' && (
            <>
              &copy; BrainBlocks {new Date().getFullYear()}.{' '}
              <a href="mailto:support@brainblocks.io?subject=Platform%20Feedback">
                Help / Suggestions
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default destyle(Footer, 'Footer')
