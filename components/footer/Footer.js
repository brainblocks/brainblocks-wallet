import React from 'react'
import { destyle } from 'destyle'

const Footer = ({ styles, children, ...rest }) => {
  return <div className={styles.root}>Footer</div>
}

export default destyle(Footer, 'Footer')
