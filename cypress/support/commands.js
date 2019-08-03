import { users } from '../support/config'

/**
 * Visit a page that requires auth
 * This will attempt to load the page, be redirected to login,
 * complete the login form, then be redirected to the original page
 * @param path string url to visit
 * @param userKey string which user account to use from the users config
 * @param fixture string | false use a particular fixture, or set to false to hit live api
 */
Cypress.Commands.add(
  'loginandvisit',
  (path, userKey, fixture = 'fixture:login.json') => {
    const user = users[userKey] || users.default

    if (fixture) {
      cy.server()
      cy.route('POST', '/api/auth', fixture)
    }

    cy.visit(path)
    cy.get('input[name=username]').type(user.username, {
      force: true,
      delay: 0
    })
    cy.get('input[name=password]').type(`${user.password}{enter}`, {
      force: true,
      delay: 0
    })

    cy.url().should('equal', Cypress.config().baseUrl + path)
  }
)
