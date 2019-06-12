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
  }
}

export function mockRoutes(routes) {
  cy.server()

  routes.forEach(route => {
    let def = route
    if (typeof route === 'string' && routeDefs.hasOwnProperty(route)) {
      def = routeDefs[route]
    } else if (typeof route !== 'object' || !route.hasOwnProperty('url')) {
      throw new Error("That does'nt look like a valid route")
    }
    cy.route(def)
  })
}
