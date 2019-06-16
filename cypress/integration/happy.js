import promisify from 'cypress-promise'
import { users } from '../support/config'
import { mockRoutes } from '../support/mock'

describe('Tests the happy paths', function() {
  it('Transfers between accounts', async function() {
    cy.task('log', '============= WARNING =============')
    cy.task(
      'log',
      'This test will fail if there are unpocketed transactions when it starts. Keep that in mind. If there are unpocketed transactions, just log in to the test account on app.brainblocks.io, receive them all, then re-run the test.'
    )
    cy.task('log', '============= /WARNING =============')

    const user = users.live

    const parseBalance = balance => parseFloat(balance)

    mockRoutes(['rates'])

    // Alias the requests we need to wait for
    cy.server()
    cy.route({
      method: 'POST',
      url: `${Cypress.env('BASE_API_URL')}/node/chains`
    }).as('getChains')
    cy.route({
      method: 'POST',
      url: `${Cypress.env('BASE_API_URL')}/node/broadcast`
    }).as('broadcast')

    // Start
    cy.loginandvisit('/', 'live', false)

    // Wait for chains
    cy.wait(['@getChains'])

    // Select account one and record balance
    cy.get('[data-cy=dashboard-account-selector] h4')
      .contains('All Accounts')
      .as('accountSelector')
      .click()

    cy.get('li h4')
      .contains(user.account1)
      .click()

    let oneBalance = await promisify(
      cy
        .get('dt')
        .contains('Balance')
        .next('dd')
        .find('> span')
        .invoke('text')
    )

    // Select account two and record balance
    cy.get('@accountSelector').click()

    cy.get('li h4')
      .contains(user.account2)
      .click()

    let twoBalance = await promisify(
      cy
        .get('dt')
        .contains('Balance')
        .next('dd')
        .find('> span')
        .invoke('text')
    )

    // Coerce the balances into numbers
    oneBalance = parseBalance(oneBalance)
    twoBalance = parseBalance(twoBalance)
    cy.task(
      'log',
      `Account 1 balance: ${oneBalance}, Account 2 balance: ${twoBalance}`
    )

    // Send from the account with the highest balance
    let fromAcc
    let toAcc
    let toAddr
    if (oneBalance > twoBalance) {
      fromAcc = user.account1
      toAcc = user.account2
      toAddr = user.address2
    } else {
      fromAcc = user.account2
      toAcc = user.account1
      toAddr = user.address1
    }

    // Click send and receive button
    cy.get('[data-cy=send-receive-btn]').click()

    // Choose "from" address
    cy.get('label[for=send-from]')
      .closest('div')
      .next('div')
      .find('> div')
      .click()
    cy.get('li h4')
      .contains(fromAcc)
      .click()

    // Enter "to" address
    cy.get('input[name=to]').type(toAddr)

    // Enter amount
    cy.get('input[name=amount]').type('0.01')

    // Send
    cy.get('button span')
      .contains('Send')
      .click()

    // Wait for broadcast to complete
    const xhr = await promisify(cy.wait(['@broadcast']))
    const txHash = xhr.responseBody.hash

    // Click "back to dashboard"
    cy.get('[data-cy=back-to-dashboard]').click()

    // Show all accounts
    cy.get('[data-cy=dashboard-account-selector] h4')
      .as('accountSelector')
      .click()

    cy.get('li h4')
      .contains('All Accounts')
      .click()

    // Verify that the transactions are in the list
    cy.get(`tr[data-hash=${txHash}]`) // The send
      .prev('tr[data-type=receive]', { timeout: 1000 * 60 * 3 }) // (should be) the receive
      .find('td:nth-child(2) h4')
      .contains(toAcc)

    // Wait for the receive block to be broadcast
    cy.wait(['@broadcast'])

    // Get the new balances

    // account1
    cy.get('@accountSelector').click()
    cy.get('li h4')
      .contains(user.account1)
      .click()
    let newOneBalance = await promisify(
      cy
        .get('dt')
        .contains('Balance')
        .next('dd')
        .find('> span')
        .invoke('text')
    )

    // account2
    cy.get('@accountSelector').click()
    cy.get('li h4')
      .contains(user.account2)
      .click()
    let newTwoBalance = await promisify(
      cy
        .get('dt')
        .contains('Balance')
        .next('dd')
        .find('> span')
        .invoke('text')
    )

    // Coerce the balances into numbers
    newOneBalance = parseBalance(newOneBalance)
    newTwoBalance = parseBalance(newTwoBalance)

    // Expect the balances to be correct
    if (fromAcc === user.account1) {
      expect(newOneBalance.toFixed(2)).to.eq((oneBalance - 0.01).toFixed(2))
      expect(newTwoBalance.toFixed(2)).to.eq((twoBalance + 0.01).toFixed(2))
    } else {
      expect(newOneBalance.toFixed(2)).to.eq((oneBalance + 0.01).toFixed(2))
      expect(newTwoBalance.toFixed(2)).to.eq((twoBalance - 0.01).toFixed(2))
    }
  })
})
