describe('Requiring a Login', () => {
  it('Visit the homepage', () => {
    cy.visit('/')
    cy.contains('h1', 'Get detailed stats for your Spotify account')
    cy.contains('button', 'Login with Spotify')
  })

  it('Visit the Recently Played page', () => {
    cy.visit('/recently-played')
    cy.contains('h1', 'Get detailed stats for your Spotify account')
    cy.contains('button', 'Login with Spotify')
  })
})
