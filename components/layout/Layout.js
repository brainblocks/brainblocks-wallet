// @flow
import React from 'react'
import { destyle } from 'destyle'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ styles, children, headerVariant = 'full', ...rest }) => {
  return (
    <div className={styles.root}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:500,600,700"
          rel="stylesheet"
        />
        <title>My page title</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      </Head>
      {headerVariant !== 'none' && (
        <div className={styles.header}>
          <Header variant={headerVariant} />
        </div>
      )}
      {children}
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  )
}

export default destyle(Layout, 'Layout')
