// @flow
import type { ReduxStore } from './reduxTypes'

export type ClassName = string | Array<string | Object> | Object

export type NextJSContext = {
  pathname: string,
  query: Object,
  asPath: string,
  req: Object,
  res: Object,
  err: Object,
  reduxStore?: ReduxStore,
  renderPage: () => Object
}

export type WithSnackbar = {
  enqueueSnackbar: (string, ?Object) => void,
  onPresentSnackbar?: () => mixed,
  closeSnackbar: () => mixed
}

export type WithRouter = {
  router: Object
}

export type WithBreakpoints = {
  breakpoints: {
    mobile?: number,
    small?: number,
    tablet?: number,
    medium?: number,
    desktop?: number,
    large?: number
  }
}
