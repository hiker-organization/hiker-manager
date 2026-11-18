describe('Tema da Aplicação | Cypress', () => {
  it('Troca de Tema', () => {
    // Variável de controle (Tema).

    let initialThemeOption: string | undefined = undefined

    // Abrindo a página requisitada com base na rota especificada.

    cy.visit(Cypress.expose('APP_URL'))

    // Verificando o conteúdo da página e extraindo o tema atual.

    cy.get('body').should('not.be.empty').then(($body) => {
      cy.log('Aplicação carregada corretamente.')

      initialThemeOption = $body.attr('data-theme')
    })

    // Clicando no botão de troca de tema.

    cy.get('[data-cy="theme-button"]').should('exist').click()

    // Verificando se a troca do tema realmente ocorreu.

    cy.get('body').should('not.be.empty').then($body  => {
      expect(initialThemeOption).not.be.undefined

      expect($body.attr('data-theme')).not.to.equal(initialThemeOption)
    })
  })
})
