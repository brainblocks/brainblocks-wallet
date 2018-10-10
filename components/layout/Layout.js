import React from 'react'
import { destyle } from 'destyle'
import Header from '~/components/header/Header'
import Footer from '~/components/footer/Footer'

const Layout = ({ styles, children, ...rest }) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Header />
      </div>
      {children}
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  )
}

export default destyle(Layout, 'Layout')
