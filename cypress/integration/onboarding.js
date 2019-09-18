import { users } from '../support/config'
import { mockRoutes } from '../support/mock'

const user = users.default

describe('Tests the onboarding process', function() {
  it('Verifies email through to successfully creating wallet', function() {
    mockRoutes([
      'verify-email',
      'chains',
      'trades',
      'rates',
      'validatepwd',
      'post-vault'
    ])

    cy.loginandvisit(
      '/email-verification?hash=$2b$10$7A/6EqhzvcpkFjAihz4Ce.KVnQSJTFnm2sDPID64bG89heGuyj2R2&verification=c31166d28ea92a92cf2088c2c4881357a4391c91',
      'default',
      'fixture:login-new-user.json'
    )

    // Continue
    cy.get('button span')
      .contains('Continue')
      .click()

    // Click on 'create' vault
    cy.get('button h3')
      .contains('Create')
      .click()

    // Switch to 'import' tab
    cy.get('li')
      .contains('Import Seed')
      .click()

    // Complete 'import' form
    cy.get('input[name=importSeed]').type(`${user.seed}`, { delay: 0 })
    cy.get('input[name=importPassword]').type(`${user.password}`, { delay: 0 })
    cy.get('input[name=importConfirmed]')
      .parents('label')
      .click()
    cy.get('button span')
      .contains('Import')
      .click()

    cy.url().should('equal', Cypress.config().baseUrl + '/')
  })
})
