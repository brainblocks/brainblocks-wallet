import 'focus-visible/dist/focus-visible.js'
import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import '~/bb-components/styles'
import '~/theme'
import { withReduxStore } from '~/state'
import SnackbarProvider from '~/bb-components/snackbar/Snackbar'

import Authorize from '~/components/auth/Authorize'

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Container>
        <SnackbarProvider>
          <Provider store={reduxStore}>
            <Authorize>
              <Component {...pageProps} />
            </Authorize>
          </Provider>
        </SnackbarProvider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
