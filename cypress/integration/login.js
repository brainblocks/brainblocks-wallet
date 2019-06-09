import { users } from '../support/config'
const user = users.default

describe('Tests the login process', function() {
  it('Logs in - no 2fa', function() {
    cy.server()
    cy.route('POST', '/local-api/auth', 'fixture:login.json')

    cy.visit('/')
    cy.get('input[name=username]').type(user.username, { force: true })
    cy.get('input[name=password]').type(`${user.password}{enter}`, {
      force: true
    })

    cy.url().should('equal', Cypress.config().baseUrl + '/')
  })

  it('Logs in - 2fa', function() {
    cy.server()
    cy.route({
      method: 'POST',
      url: '/local-api/auth',
      status: 401,
      response: 'fixture:login-2fa.json'
    })

    cy.visit('/')
    cy.get('input[name=username]').type(user.username, { force: true })
    cy.get('input[name=password]').type(`${user.password}{enter}`, {
      force: true
    })

    cy.route('POST', '/local-api/auth', 'fixture:login.json')
    cy.get('input[name=mfaCode]').type(`${user.mfaCode}{enter}`, {
      force: true
    })

    cy.url().should('equal', Cypress.config().baseUrl + '/')
  })
})
