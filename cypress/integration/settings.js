import { users } from '../support/config'
import { mockRoutes } from '../support/mock'

const user = users.default

describe('Tests settings', function() {
  it('Reveals seed', function() {
    mockRoutes(['chains', 'trades', 'rates'])

    cy.loginandvisit('/settings')

    // Switch to security tab
    cy.get('[role="tab"] span')
      .contains('Security')
      .click()

    // Click seed button
    cy.get('button span')
      .contains('Save Seed')
      .click()

    // Seed is shown as password initially
    cy.get('#wallet-seed')
      .invoke('attr', 'type')
      .should('eq', 'password')

    // Enter password
    cy.get('#seed-password[type="password"]').type(user.password)

    // Click unlock button
    cy.get('button span')
      .contains('Unlock')
      .click()

    // Seed should no longer be of type password and should contain the seed
    cy.get('#wallet-seed[type="text"]')
      .invoke('val')
      .should('eq', user.seed)
  })

  it('Changes password', function() {
    const newPass = 'vasna8932oa!B'
    mockRoutes(['chains', 'trades', 'rates', 'change-password'])
    cy.loginandvisit('/settings?tab=security')

    // Click seed button
    cy.get('button span')
      .contains('Change Password')
      .click()

    // Complete form
    cy.get('input[name="oldPass"]').type(user.password)
    cy.get('input[name="newPass"').type(newPass)
    cy.get('input[name="newPass2"').type(newPass)

    // Click Change Password button
    cy.get('button span')
      .contains('Change Password')
      .click()

    // Test for success message
    cy.get('#client-snackbar')
      .contains('Password changed successfully')
      .should('exist')
  })
})
