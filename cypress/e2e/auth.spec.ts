describe('Sign In', () => {
  it('Login directly using tokens', () => {
    cy.tokenSignIn()
    cy.visit('/')
    cy.url().should('eq', 'http://localhost:4173/stats')
  })
})

describe('Sign Out', () => {
  it('Login, click on menu and click on Sign out', () => {
    cy.tokenSignIn()
    cy.visit('/')
    cy.url().should('eq', 'http://localhost:4173/stats')
    cy.get('[aria-haspopup="menu"]').click()
    cy.wait(500)
    cy.get('.v-list-item-title').contains('Sign out').click()
    cy.wait(500)
    cy.url().should('eq', 'http://localhost:8000/')
  })
})
