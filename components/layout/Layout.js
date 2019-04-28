// @flow
import React from 'react'
import { destyle } from 'destyle'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

class Layout extends React.Component {
  state = {
    scrollOffset: 0
  }

  componentDidMount() {
    if (typeof document !== 'undefined') {
      document.addEventListener('scroll', this.handleScroll)
      this.handleScroll()
    }
  }

  componentWillUnmount() {
    if (typeof document !== 'undefined') {
      document.removeEventListener('scroll', this.handleScroll)
    }
  }

  handleScroll = () => {
    const { scrollOffset } = this.state
    const top = window.pageYOffset || document.documentElement.scrollTop
    if (
      (top === 0 && scrollOffset !== 0) ||
      (top !== 0 && scrollOffset === 0)
    ) {
      this.setState({
        scrollOffset: top
      })
    }
  }

  render() {
    const {
      styles,
      children,
      headerVariant = 'full',
      footerVariant = 'full',
      ...rest
    } = this.props
    return (
      <>
        {headerVariant !== 'none' && (
          <div className={styles.header}>
            <Header variant={headerVariant} />
          </div>
        )}
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
          {children}
          {footerVariant !== 'none' && false && (
            <div className={styles.footer}>
              <Footer variant={footerVariant} />
            </div>
          )}
        </div>
      </>
    )
  }
}

export default destyle(Layout, 'Layout')
