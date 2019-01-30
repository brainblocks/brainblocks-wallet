import 'focus-visible/dist/focus-visible.js'
import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import '~/theme'
import theme from '~/theme/theme'
import { withReduxStore } from '~/state'
import { Snackbar } from 'brainblocks-components'
//import SnackbarProvider from '~/bb-components/snackbar/Snackbar'
import ReactBreakpoints from 'react-breakpoints'
import CheckIcon from '~/static/svg/icons/alert-check.svg'
import ExclaimIcon from '~/static/svg/icons/alert-exclaim.svg'
import InfoIcon from '~/static/svg/icons/alert-info.svg'
import CrossIcon from '~/static/svg/icons/alert-cross.svg'

import Authorize from '~/components/auth/Authorize'

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Container>
        {/*<Snackbar
          successIcon={<CheckIcon />}
          errorIcon={<CrossIcon />}
          infoIcon={<InfoIcon />}
          warningIcon={<ExclaimIcon />}
        >*/}
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
        {/*</Snackbar>*/}
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
