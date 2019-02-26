// @flow
const actions = {
  ADD_ACTIVE_PROCESS: 'UI::ADD_ACTIVE_PROCESS',
  REMOVE_ACTIVE_PROCESS: 'UI::REMOVE_ACTIVE_PROCESS'
}

const creators = {
  addActiveProcess: processId => ({
    type: actions.ADD_ACTIVE_PROCESS,
    processId
  }),
  removeActiveProcess: processId => ({
    type: actions.REMOVE_ACTIVE_PROCESS,
    processId
  })
}

export { actions, creators }
