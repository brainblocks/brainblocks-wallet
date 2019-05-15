// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import Header from './Header'
import Footer from './Footer'

type Props = {
  styles: Object,
  children: React.Node,
  headerVariant?: string,
  footerVariant?: string
}

type State = {
  scrollOffset: number
}

class Layout extends React.Component<Props, State> {
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
    // $FlowFixMe
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
      footerVariant = 'full'
    } = this.props
    return (
      <>
        {headerVariant !== 'none' && (
          <div className={styles.header}>
            <Header variant={headerVariant} />
          </div>
        )}
        <div className={styles.root}>
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
