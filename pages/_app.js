import 'focus-visible/dist/focus-visible.js'
import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import '~/bb-components/styles'
import '~/theme'
import theme from '~/theme/theme'
import { withReduxStore } from '~/state'
import SnackbarProvider from '~/bb-components/snackbar/Snackbar'
import ReactBreakpoints from 'react-breakpoints'

import Authorize from '~/components/auth/Authorize'

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Container>
        <SnackbarProvider>
          <ReactBreakpoints
            breakpoints={theme.bp}
            debounceResize={true}
            debounceDelay={200}
          >
            <Provider store={reduxStore}>
              <Authorize>
                <Component {...pageProps} />
              </Authorize>
            </Provider>
          </ReactBreakpoints>
        </SnackbarProvider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
