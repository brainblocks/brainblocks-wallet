// @flow
import ReactGA from 'react-ga'
// import { getClientSideStore } from '~/state'
// import { creators as UIActions } from '~/state/actions/uiActions'

/**
 * The commented functions here add a loading spinner during routing
 * They are commented because they create an infinite redirect on
 * logout (and potentially other instances where ClientBootstrap)
 * redirects. Maybe one day we can revisit...
 */

function startRouting(url: string): void {
  // const reduxStore = getClientSideStore()
  // if (reduxStore) {
  //   reduxStore.dispatch(UIActions.addActiveProcess(`Routing to ${url}`))
  // }
}

// function removeRoutingProcess(url: string): void {
//   const reduxStore = getClientSideStore()
//   if (reduxStore) {
//     reduxStore.dispatch(UIActions.addActiveProcess(`Routing to ${url}`))
//   }
// }

function finishRouting(url: string): void {
  // removeRoutingProcess(url)
  ReactGA.pageview(url)
}

function routingError(err: Object, url: string): void {
  // if (err.cancelled) {
  //   removeRoutingProcess(url)
  // }
}

export function setupRouterEvents(router: Object): void {
  router.events.off('routeChangeStart', startRouting)
  router.events.off('routeChangeComplete', finishRouting)
  router.events.off('routeChangeError', routingError)

  router.events.on('routeChangeStart', startRouting)
  router.events.on('routeChangeComplete', finishRouting)
  router.events.on('routeChangeError', routingError)
}
