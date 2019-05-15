// @flow
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { DEBUG } = publicRuntimeConfig

let latestLog

const noop = () => {}

const logFunc: (level: string, args: mixed[]) => void = (level, args) => {
  const thisLogTime = Date.now()
  let timeDiff
  if (latestLog) {
    timeDiff = thisLogTime - latestLog
  } else {
    timeDiff = 0
  }
  latestLog = thisLogTime
  // eslint-disable-next-line no-console
  console[level](`+${timeDiff}ms >`, ...args)
}

type Log = {
  info: (...args: mixed[]) => void,
  warn: (...args: mixed[]) => void,
  error: (...args: mixed[]) => void
}

const log: Log = {
  info: (...args) => logFunc('log', args),
  warn: (...args) => logFunc('warn', args),
  error: (...args) => logFunc('error', args)
}

if (DEBUG !== 'true') {
  log.info = noop
  log.warn = noop
  log.error = noop
}

export default log
