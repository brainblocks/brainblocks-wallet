import React from 'react'
import { destyle } from 'destyle'

const Header = ({ styles, children, ...rest }) => {
  return <div className={styles.root}>Header</div>
}

export default destyle(Header, 'Header')
