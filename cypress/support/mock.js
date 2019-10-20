import { PRICE_API_URL } from '../../constants/config'

const routeDefs = {
  'verify-email': {
    method: 'POST',
    url: `${Cypress.env('BASE_API_URL')}/users/rpc/verify-email`,
    response: 'fixture:verify-email.json'
  },
  chains: {
    method: 'POST',
    url: `${Cypress.env('BASE_API_URL')}/node/chains`,
    response: 'fixture:chains.json'
  },
  trades: {
    method: 'GET',
    url: `${Cypress.env('BASE_API_URL')}/trade/trades?limit=10000&offset=100`,
    response: 'fixture:trades.json'
  },
  rates: {
    method: 'GET',
    url: PRICE_API_URL,
    response: 'fixture:rates.json'
  },
  validatepwd: {
    method: 'POST',
    url: `${Cypress.env('BASE_API_URL')}/auth/validatepwd`,
    response: 'fixture:validatepwd.json'
  },
  'change-password': {
    method: 'PATCH',
    url: `${Cypress.env('BASE_API_URL')}/users/password`,
    response: 'fixture:change-password.json'
  },
  'post-vault': {
    method: 'POST',
    url: `${Cypress.env('BASE_API_URL')}/users/vault`,
    response: 'fixture:post-vault.json'
  },
  'patch-vault': {
    method: 'PATCH',
    url: `${Cypress.env('BASE_API_URL')}/users/vault`,
    response: 'fixture:patch-vault.json'
  },
  'all-pairs': {
    method: 'GET',
    url: `${Cypress.env('BASE_API_URL')}/trade/pairs`,
    response: 'fixture:all-pairs.json'
  },
  'nano-pairs': {
    method: 'GET',
    url: `${Cypress.env('BASE_API_URL')}/trade/pairs/NANO`,
    response: 'fixture:nano-pairs.json'
  },
  'estimate-eth-100': {
    method: 'GET',
    url: `${Cypress.env(
      'BASE_API_URL'
    )}/trade/estimate?amount=100&pair=ETH_NANO`,
    response: 'fixture:estimate-eth-100.json'
  },
  'create-eth-trade': {
    method: 'POST',
    url: `${Cypress.env('BASE_API_URL')}/trade/create`,
    response: 'fixture:create-eth-trade.json'
  },
  'get-eth-trade': {
    method: 'GET',
    url: `${Cypress.env(
      'BASE_API_URL'
    )}/trade/trades/0f248ce7-b9f5-420d-955e-89642725611b`,
    response: 'fixture:get-eth-trade-incomplete.json'
  }
}

export function mockRoutes(routes) {
  cy.server()

  routes.forEach(route => {
    let def = route
    if (typeof route === 'string' && routeDefs.hasOwnProperty(route)) {
      def = routeDefs[route]
    } else if (typeof route !== 'object' || !route.hasOwnProperty('url')) {
      throw new Error("That doesn't look like a valid route")
    }

    cy.task('log', `Stubbing route: ${def.method} ${def.url}`)
    cy.route(def)
  })
}
