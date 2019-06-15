import { users } from '../support/config'
import { mockRoutes } from '../support/mock'

const user = users.default

describe('Tests account-related functionality', function() {
  it('Creates a new account', function() {
    cy.task('log', JSON.stringify(Cypress.env(), null, 2))
    mockRoutes(['chains', 'rates', 'patch-vault'])

    cy.loginandvisit('/accounts')

    // Continue
    cy.get('a span')
      .contains('Add Account')
      .click()

    // Complete settings form
    cy.get('#account-name').type(`Test Account`, { delay: 0 })
    cy.get('label[for=color-option-1]').click()
    cy.get('button span')
      .contains('Create Account')
      .click()

    // Account should exist and have the expected Nano address
    cy.get('h4').contains('Test Account')
    cy.get('p span').contains(user.address2.substring(user.address2.length - 5))
  })
})
