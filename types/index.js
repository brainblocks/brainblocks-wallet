// @flow

export type ClassName = string | Array<string | Object> | Object

export type NormalizedState = { allIds: Object, byId: string[] }

export type NextJSContext = {
  pathName?: string,
  query?: Object,
  asPath?: string,
  req?: Object,
  res?: Object,
  err?: Object,
  reduxStore?: ReduxStore
}

export type ReduxStore = {
  dispatch: Function => mixed,
  getState: () => Object
}
