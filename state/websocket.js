// @flow
import getConfig from 'next/config'
import { isServer } from '~/state'
import log from '~/functions/log'

const { publicRuntimeConfig } = getConfig()
const { WEBSOCKET_URL } = publicRuntimeConfig

let socket = null

export const initWs: () => WebSocket = () => {
  if (isServer) throw new Error('On server - not creating websocket')
  if (!socket) {
    socket = new WebSocket(WEBSOCKET_URL)
  }
  return socket
}

export const getWs: () => WebSocket = () => {
  if (isServer) throw new Error('On server - not getting websocket')
  if (!socket) throw new Error('Websocket not instantiated')
  return socket
}

export const closeWs: () => void = () => {
  if (socket) {
    socket.close()
    socket = null
  }
}

export const subscribeAccounts: (accounts: string[]) => void = accounts => {
  const ws = getWs()
  ws.send(
    JSON.stringify({
      event: 'subscribe',
      data: accounts
    })
  )
}

export const getPending: (accounts: string[]) => void = accounts => {
  const ws = getWs()
  log.info('Getting pending for ', accounts)
  ws.send(
    JSON.stringify({
      event: 'pending',
      data: accounts
    })
  )
}
