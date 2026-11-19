describe('Listagem de Usuários | Cypress', () => {
  it('Carregamento da Listagem', () => {
    // Variável de controle (Autenticação).

    let unauthorized = false

    // Obtendo o retorno de requisições que ocorrerem durante a execução do teste.

    cy.intercept('**/*', (request) => {
      request.continue((response) => {
        if (response.statusCode === 401) {
          unauthorized = true
        }
      })
    })

    // Abrindo a página requisitada com base na rota especificada.

    cy.visit(`${Cypress.expose('APP_URL')}/users`)

    // Executando a função de autenticação, caso seja necessária.

    cy.then(() => {
      if (unauthorized) {
        cy.auth()

        cy.visit(`${Cypress.expose('APP_URL')}/users`)
      }
    })

    // Verificando o conteúdo da página.

    cy.get('body').should('not.be.empty').then(() => {
      cy.log('Aplicação carregada corretamente.')
    })

    // Ainda em análise.
  })
})
