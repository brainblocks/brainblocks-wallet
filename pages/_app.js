import 'focus-visible/dist/focus-visible.js'
import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import '~/theme'
import theme from '~/theme/theme'
import { creators as uiActions } from '~/state/actions/uiActions'
import { withReduxStore } from '~/state'
import { Snackbar } from 'brainblocks-components'
import ReactBreakpoints, { Media } from 'react-breakpoints'
import CheckIcon from '~/static/svg/icons/alert-check.svg'
import ExclaimIcon from '~/static/svg/icons/alert-exclaim.svg'
import InfoIcon from '~/static/svg/icons/alert-info.svg'
import CrossIcon from '~/static/svg/icons/alert-cross.svg'
import ErrorBoundary from '~/components/error/ErrorBoundary'
import { hydrate } from 'emotion'

if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids)
}

class MyApp extends App {
  componentDidMount() {
    // this action is added by bootstrapInitialProps on the server
    this.props.reduxStore.dispatch(uiActions.removeActiveProcess('hydrating'))
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Container>
        <ErrorBoundary>
          <Provider store={reduxStore}>
            <ReactBreakpoints
              breakpoints={theme.bp}
              debounceResize={true}
              debounceDelay={200}
            >
              <Media>
                {({ breakpoints, currentBreakpoint }) => (
                  <Snackbar
                    successIcon={<CheckIcon />}
                    errorIcon={<CrossIcon />}
                    infoIcon={<InfoIcon />}
                    warningIcon={<ExclaimIcon />}
                    notistackProps={{
                      maxSnack:
                        breakpoints[currentBreakpoint] >= breakpoints.tablet
                          ? 3
                          : 1
                    }}
                  >
                    <Component {...pageProps} />
                  </Snackbar>
                )}
              </Media>
            </ReactBreakpoints>
          </Provider>
        </ErrorBoundary>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
