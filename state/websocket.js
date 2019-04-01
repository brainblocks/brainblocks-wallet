import getConfig from 'next/config'
import { isServer } from '~/state'

const { publicRuntimeConfig } = getConfig()
const { WEBSOCKET_URL } = publicRuntimeConfig

let ws = null

export const initWs = () => {
  if (!isServer && !ws) {
    ws = new WebSocket(WEBSOCKET_URL)
  }
  return ws
}

export const getWs = () => {
  return ws
}

export const subscribeAccounts = accounts => {
  ws.send(
    JSON.stringify({
      event: 'subscribe',
      data: accounts
    })
  )
}

export const getPending = accounts => {
  console.log('Getting pending for ', accounts)
  ws.send(
    JSON.stringify({
      event: 'pending',
      data: accounts
    })
  )
}
