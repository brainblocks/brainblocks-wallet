import React from 'react'
import { destyle } from 'destyle'

const Footer = ({ styles, variant = 'full', ...rest }) => {
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
