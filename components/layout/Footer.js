import React from 'react'
import { destyle } from 'destyle'

const Footer = ({ styles, children, ...rest }) => {
  return (
    <div className={styles.root}>
      <div className={styles.pageWidth}>
        <div className={styles.inner}>
          &copy; BrainBlocks {new Date().getFullYear()}.{' '}
          <a href="#">Help / Suggestions</a>
        </div>
      </div>
    </div>
  )
}

export default destyle(Footer, 'Footer')
