const playlist1Index = 4 // Choose random playlist index from list
const playlist2Index = 1 // Choose playlist index that is not the same as playlist1Index and has 0 duplicates
const playlist3Index = 5 // Choose playlist index that is not the same as playlist1Index and has at least 1 duplicate
describe("Deduplicator", () => {
  it("Find duplicates - No duplicates found", () => {
    cy.tokenSignIn()
    cy.visit('/deduplicator')
    cy.url().should('eq', 'http://localhost:4173/deduplicator')
    cy.contains("button", "Find Duplicates").should("be.disabled")
    // Select first playlist
    cy.get(".v-input__control").eq(0).click()
    cy.get(".v-list-item-title").eq(playlist1Index).click()
    cy.contains("button", "Find Duplicates").should("be.disabled")

    // Select second playlist
    cy.get(".v-input__control").eq(1).click()
    cy.get(".v-list-item-title").eq(playlist2Index).click()
    cy.contains("button", "Find Duplicates").should("not.be.disabled")

    // Click find duplicates
    cy.contains("button", "Find Duplicates").click()
    cy.wait(1500)
    cy.contains("No Duplicates Found")
  })

  it("Find duplicates - Duplicates found", () => {
    cy.tokenSignIn()
    cy.visit('/deduplicator')
    cy.url().should('eq', 'http://localhost:4173/deduplicator')
    cy.contains("button", "Find Duplicates").should("be.disabled")
    // Select first playlist
    cy.get(".v-input__control").eq(0).click()
    cy.get(".v-list-item-title").eq(playlist1Index).click()
    cy.contains("button", "Find Duplicates").should("be.disabled")

    // Select second playlist
    cy.get(".v-input__control").eq(1).click()
    cy.get(".v-list-item-title").eq(playlist3Index).click()
    cy.contains("button", "Find Duplicates").should("not.be.disabled")

    // Click find duplicates
    cy.contains("button", "Find Duplicates").click()
    cy.wait(1500)
    cy.contains("Found Duplicates")
  })
})