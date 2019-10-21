import { mockRoutes } from '../support/mock'

const ethAddress = '0x1f9bc6c897799d93980F41B93B03d177360f9486'

describe('Tests trade-related functionality', function() {
  it('Creates a new buy', function() {
    mockRoutes([
      'chains-trade',
      'trades',
      'rates',
      'all-pairs',
      'nano-pairs',
      'estimate-buy-eth-100',
      'create-buy',
      'get-buy'
    ])

    cy.loginandvisit('/buy-sell')

    // Click buy button
    cy.get('[data-cy="buy-btn"]').click()

    // Fill form
    cy.get('[data-cy="sell-currency"]').select('ETH')
    cy.get('[data-cy="amount"]').type('27')
    cy.get('[data-cy="use-refund-address"]').click()
    cy.get('[data-cy="refund-address"]').type(ethAddress)

    // Continue
    cy.get('[data-cy="create-buy-btn"]').click()

    // Table should exist, check some values
    cy.get('[data-cy="trade-status-table"]')
    cy.get('[data-cy="trade-status-table-id"]').contains(
      '0f248ce7-b9f5-420d-955e-89642725611b'
    )

    // Complete
    cy.get('[data-cy="complete-order-btn"]').click()

    // View status
    cy.get('[data-cy="view-buy-status"]').click()

    // Table should exist, check some values
    cy.get('[data-cy="trade-status-table"]')
    cy.get('[data-cy="trade-status-table-id"]').contains(
      '0f248ce7-b9f5-420d-955e-89642725611b'
    )
  })

  it('Creates a new sell', function() {
    mockRoutes([
      'chains-trade',
      'trades',
      'rates',
      'all-pairs',
      'nano-pairs',
      'estimate-sell-eth-100',
      'create-sell',
      'get-sell',
      'broadcast-sell'
    ])

    cy.loginandvisit('/buy-sell')

    // Click sell button
    cy.get('[data-cy="sell-btn"]').click()

    // Fill form
    cy.get('[data-cy="buy-currency"]').select('ETH')
    cy.get('[data-cy="amount"]').type('27')
    cy.get('[data-cy="payout-address"]').type(ethAddress)

    // Continue
    cy.get('[data-cy="create-sell-btn"]').click()

    // Table should exist, check some values
    cy.get('[data-cy="trade-status-table"]')
    cy.get('[data-cy="trade-status-table-id"]').contains(
      'd4521dd4-46fb-430c-a352-e21336e7bcb8'
    )

    // Button should be disabled until we check the box
    cy.get('[data-cy="complete-order-btn"]').should('be.disabled')
    cy.get('input[name="addressConfirmed"]')
      .parents('label')
      .click()

    // Complete
    cy.get('[data-cy="complete-order-btn"]').click()

    // View status
    cy.get('[data-cy="view-sell-status"]').click()

    // Table should exist, check some values
    cy.get('[data-cy="trade-status-table"]')
    cy.get('[data-cy="trade-status-table-id"]').contains(
      'd4521dd4-46fb-430c-a352-e21336e7bcb8'
    )
  })
})
