/* @flow */

/**
 * Utilities for helping with reducing redux boilerplate
 */
import produce from 'immer'

const createModel = (
  /** Each action will be exported as `${prefix}/${name}` */
  prefix: string,
  initialState: mixed,
  actionHandlers: {},
  customHandlers: {} = {}
) => {
  const constants = {}
  const actions = {}
  const handlers = {}

  Object.keys(actionHandlers).forEach(name => {
    // setup the action constant naming
    const constant = `${prefix}/${name}`
    constants[name] = constant

    // this is the args plus handler function given in definition
    var args = actionHandlers[name]
    if (Array.isArray(args)) {
      handlers[constant] = args[1]
      args = args[0]
    } else {
      handlers[constant] = args
      args = []
    }

    // build the exportable action
    // NOTE: type and arg checking could be added here
    actions[name] = (...values) => {
      const payload = {
        type: constant
      }
      args.forEach((a, i) => (payload[a] = values[i]))
      return payload
    }
  })

  Object.keys(customHandlers).forEach(constant => {
    handlers[constant] = customHandlers[constant]
  })

  const reducer = (state: mixed = initialState, action: { type: string }) => {
    const handler = handlers[action.type]
    return handler ? produce(state, draft => handler(draft, action)) : state
  }

  return {
    constants,
    actions,
    handlers,
    reducer
  }
}

export { createModel }
