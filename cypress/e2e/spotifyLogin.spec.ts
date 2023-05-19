describe('Spotify Login', () => {
  it('Redirects to Spotify login/authorization page = AGREE', () => {
    cy.visit('/')
    cy.contains('button', 'Login with Spotify').click()
    cy.url().then(url => {
      cy.wait(1500)
      cy.origin('https://accounts.spotify.com', () => {
        cy.get('input#login-username').type(Cypress.env('SPOTIFY_USERNAME'))
        cy.get('input#login-password').type(Cypress.env('SPOTIFY_PASSWORD'))
        cy.get('button#login-button').click()
      })
    })

    cy.url().then(url => {
      cy.wait(1500)
      cy.origin('https://accounts.spotify.com', () => {
        cy.contains('button', 'Agree').click()
      })
    })

    cy.url().should('eq', 'http://localhost:8000/')
  })

  it('Redirects to Spotify login/authorization page = CANCEL', () => {
    cy.visit('/')
    cy.contains('button', 'Login with Spotify').click()
    cy.url().then(url => {
      cy.wait(1500)
      cy.origin('https://accounts.spotify.com', () => {
        cy.get('input#login-username').type(Cypress.env('SPOTIFY_USERNAME'))
        cy.get('input#login-password').type(Cypress.env('SPOTIFY_PASSWORD'))
        cy.get('button#login-button').click()
      })
    })

    cy.url().then(url => {
      cy.wait(1500)
      cy.origin('https://accounts.spotify.com', () => {
        cy.contains('button', 'Cancel').click()
      })
    })

    cy.url().should('eq', 'http://localhost:8000/')
  })
})