describe('Tests the registration process', function() {
  const username = 'testuser1'
  const email = 'email@example.com'
  const password = 'xYk@^j2Y9j3A'

  it('Registers a new account', function() {
    cy.server()
    cy.route('POST', '/local-api/users', 'fixture:register.json')

    cy.visit('/')
    cy.get('[role="tab"]')
      .contains('Register')
      .click({ force: true })
    cy.get('input[name=username]').type(username, { force: true })
    cy.get('input[name=email]').type(`${email}{enter}`, { force: true })
    cy.get('input[name=password]').type(`${password}{enter}`, { force: true })
    cy.get('input[name=retype]').type(`${password}{enter}`, { force: true })

    cy.url().should('equal', Cypress.config().baseUrl + '/email-verification')
  })
})
