import { users } from '../support/config'

/**
 * Visit a page that requires auth
 * This will attempt to load the page, be redirected to login,
 * complete the login form, then be redirected to the original page
 */
Cypress.Commands.add('loginandvisit', (path, userKey, fixture) => {
  const user = users[userKey] || users.default
  const stub = fixture || 'fixture:login.json'

  cy.server()
  cy.route('POST', '/local-api/auth', stub)

  cy.visit(path)
  cy.get('input[name=username]').type(user.username, { force: true, delay: 0 })
  cy.get('input[name=password]').type(`${user.password}{enter}`, {
    force: true,
    delay: 0
  })

  cy.url().should('equal', Cypress.config().baseUrl + path)
})
