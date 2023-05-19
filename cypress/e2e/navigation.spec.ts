
describe('Navigation',()=>{
    it('Visit the Recently Played page - Success',()=>{
        cy.tokenSignIn()
        cy.visit('/recently-played')
        cy.url().should('eq','http://localhost:8000/recently-played')
        cy.contains('h1','Recently Played')
})

it('Visit Stats - Success',()=>{
    cy.tokenSignIn()
    cy.visit('/stats')
    cy.url().should('eq','http://localhost:8000/stats')
    cy.contains('h1','Your Top Artists')
    cy.contains('h1','Your Top Tracks')
})

it('Visit Deduplicator - Success',()=>{
    cy.tokenSignIn()
    cy.visit('/deduplicator')
    cy.url().should('eq','http://localhost:8000/deduplicator')
    cy.get('#duplicates-button').contains('Find Duplicates')
   
})
})
