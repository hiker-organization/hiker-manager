describe('Listagem de Usuários | Cypress', () => {
  it('Carregamento da Listagem', () => {
    // Autenticando antes da visita, pois o guard de rotas exige sessão.

    cy.auth()

    // Abrindo a página requisitada com base na rota especificada.

    cy.visit(`${Cypress.expose('APP_URL')}/users`)

    // Verificando o conteúdo da página.

    cy.get('body').should('not.be.empty').then(() => {
      cy.log('Aplicação carregada corretamente.')
    })

    // Ainda em análise.
  })
})
