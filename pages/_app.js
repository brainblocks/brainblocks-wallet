// @flow
import 'focus-visible/dist/focus-visible.js'
import App, { Container } from 'next/app'
import Head from 'next/head'
import React from 'react'
import ReactGA from 'react-ga'
import { Provider } from 'react-redux'
import '~/theme'
import theme from '~/theme/theme'
import { creators as uiActions } from '~/state/actions/uiActions'
import { withReduxStore, isServer } from '~/state'
import Snackbar from 'brainblocks-components/build/Snackbar'
import ReactBreakpoints from 'react-breakpoints'
import CheckIcon from '~/static/svg/icons/alert-check.svg'
import ExclaimIcon from '~/static/svg/icons/alert-exclaim.svg'
import InfoIcon from '~/static/svg/icons/alert-info.svg'
import CrossIcon from '~/static/svg/icons/alert-cross.svg'
import ErrorBoundary from '~/components/error/ErrorBoundary'
import { hydrate } from 'emotion'
import type { ReduxStore } from '~/types/reduxTypes'

if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids)
}

type Props = {
  reduxStore: ReduxStore
}

class MyApp extends App<Props> {
  constructor(props) {
    super(props)
    if (!isServer) {
      ReactGA.initialize('UA-130957297-3')
      ReactGA.pageview(props.router.asPath)
    }
  }

  componentDidMount() {
    // this action is added by bootstrapInitialProps on the server
    if (!isServer) {
      this.props.reduxStore.dispatch(uiActions.removeActiveProcess('hydrating'))
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <meta name="description" content="BrainBlocks Wallet" />
          <meta property="og:title" content="BrainBlocks" />
          <meta
            property="og:image"
            content="/static/pwa/apple-touch-icon-precomposed.png"
          />
          <link rel="manifest" href="/static/manifest.json" />
          <meta name="theme-color" content="#1a2d58" />
          <meta name="msapplication-TileColor" content="#1a2d58" />
          <link
            rel="shortcut icon"
            href="/static/pwa/apple-touch-icon-precomposed.png"
          />
          <link
            rel="apple-touch-icon"
            href="/static/pwa/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/pwa/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/pwa/favicon-16x16.png"
          />
          <link
            rel="mask-icon"
            href="/static/pwa/safari-pinned-tab.svg"
            color="#1a2d58"
          />
          <meta name="application-name" content="BrainBlocks" />
          <meta name="apple-mobile-web-app-title" content="BrainBlocks" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="mobile-web-app-capable" content="yes" />
        </Head>
        <Container>
          <ErrorBoundary>
            <Provider store={reduxStore}>
              <ReactBreakpoints
                breakpoints={theme.bp}
                debounceResize={true}
                debounceDelay={200}
              >
                <Snackbar
                  successIcon={<CheckIcon />}
                  errorIcon={<CrossIcon />}
                  infoIcon={<InfoIcon />}
                  warningIcon={<ExclaimIcon />}
                  notistackProps={{
                    maxSnack:
                      typeof window !== 'undefined' &&
                      window.outerWidth >= theme.bp.tablet
                        ? 3
                        : 1
                  }}
                >
                  <Component {...pageProps} />
                </Snackbar>
              </ReactBreakpoints>
            </Provider>
          </ErrorBoundary>
        </Container>
      </>
    )
  }
}

export default withReduxStore(MyApp)
