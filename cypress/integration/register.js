import { users } from '../support/config'
const user = users.default

describe('Tests the registration process', function() {
  it('Registers a new account', function() {
    cy.server()
    cy.route('POST', '/api/users', 'fixture:register.json')

    cy.visit('/')
    cy.get('[role="tab"]')
      .contains('Register')
      .click({ force: true })
    cy.get('input[name=username]').type(user.username, { force: true })
    cy.get('input[name=email]').type(user.email, { force: true })
    cy.get('input[name=password]').type(user.password, { force: true })
    cy.get('input[name=retype]').type(`${user.password}`, {
      force: true
    })
    cy.get('input[name=agreeTerms]')
      .parents('label')
      .click()

    cy.get('[data-cy="register-btn"]').click()

    cy.url().should('equal', Cypress.config().baseUrl + '/email-verification')
  })
})
