/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

//@ts-ignore
import { CODE_VERIFIER, AUTH_CODE, ACCESS_TOKEN, REFRESH_TOKEN, EXPIRES_IN } from './privkeys.js'

Cypress.Commands.add('spotifyLogin', (email: string, password: string) => {
  cy.get('input#login-username').type(email)
  cy.get('input#login-password').type(password)
  cy.get('button#login-button').click()
})

Cypress.Commands.add('tokenSignIn', () => {
  cy.window().then(window => {
    window.localStorage.setItem('code_verifier', CODE_VERIFIER)
    window.localStorage.setItem('auth_code', AUTH_CODE)
    window.localStorage.setItem('access_token', ACCESS_TOKEN)
    window.localStorage.setItem('refresh_token', REFRESH_TOKEN)
    window.localStorage.setItem('expires_in', EXPIRES_IN)
  })
})

declare global {
  namespace Cypress {
    interface Chainable {
      spotifyLogin(email: string, password: string): Chainable<void>
      tokenSignIn(): Chainable<void>
    }
  }
}

export { }
