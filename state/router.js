// @flow
import Router from 'next/router'
import ReactGA from 'react-ga'
import { getClientSideStore } from '~/state'
import { creators as UIActions } from '~/state/actions/uiActions'

Router.events.on('routeChangeStart', url => {
  const reduxStore = getClientSideStore()
  if (reduxStore) {
    reduxStore.dispatch(UIActions.addActiveProcess('Routing'))
  }
})

Router.events.on('routeChangeComplete', url => {
  const reduxStore = getClientSideStore()
  if (reduxStore) {
    reduxStore.dispatch(UIActions.removeActiveProcess('Routing'))
  }
  ReactGA.pageview(url)
})
