describe('Tests the login process', function() {
  const username = 'testuser1'
  const password = 'xYk@^j2Y9j3A'
  const mfaCode = '123456'

  it('Logs in - no 2fa', function() {
    cy.server()
    cy.route('POST', '/local-api/auth', 'fixture:login.json')

    cy.visit('/')
    cy.get('input[name=username]').type(username, { force: true })
    cy.get('input[name=password]').type(`${password}{enter}`, { force: true })

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
    cy.get('input[name=username]').type(username, { force: true })
    cy.get('input[name=password]').type(`${password}{enter}`, { force: true })

    cy.route('POST', '/local-api/auth', 'fixture:login.json')
    cy.get('input[name=mfaCode]').type(`${mfaCode}{enter}`, { force: true })

    cy.url().should('equal', Cypress.config().baseUrl + '/')
  })
})
