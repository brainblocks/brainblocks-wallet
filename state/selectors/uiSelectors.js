import { createSelector } from 'reselect'

const getActiveProcesses = state => state.ui.activeProcesses

export const getIsWorking = createSelector(
  [getActiveProcesses],
  activeProcesses => activeProcesses.length > 0
)
