import React from 'react'
import { destyle } from 'destyle'

const Footer = ({ styles, children, ...rest }) => {
  return (
    <div className={styles.root}>
      <div className={styles.pageWidth}>
        <div className={styles.inner}>Footer</div>
      </div>
    </div>
  )
}

export default destyle(Footer, 'Footer')
