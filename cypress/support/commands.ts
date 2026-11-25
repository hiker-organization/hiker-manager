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

declare global {
  namespace Cypress {
    interface Chainable {
      auth(): Chainable<void>
    }
  }
}

Cypress.Commands.add('auth', () => {
  cy.env(['API_URL', 'AUTH_EMAIL', 'AUTH_PASSWORD']).then((env) => {
    cy.session('cypress-user-auth', () => {
      cy.request({
        method: 'POST',
        url: `${env.API_URL}/auth/web/login`,
        body: {
          email: env.AUTH_EMAIL,
          password: env.AUTH_PASSWORD,
        }
      })

      // Indicador de sessão lido pelo guard de rotas (no uso normal, gravado pelo formulário de login).

      cy.visit(Cypress.expose('APP_URL'))

      cy.window().then((win) => {
        win.localStorage.setItem('hiker-manager-session', 'true')
      })
    }).its('status').should('eq', 201)
  })
})

export {}
