describe('Tema da Aplicação | Cypress', () => {
  it('Troca de Tema', () => {
    let initialThemeOption: string | undefined = undefined

    cy.visit('http://localhost:5173')

    cy.get('body').should('not.be.empty').then(($body) => {
      cy.log('Aplicação carregada corretamente.')

      initialThemeOption = $body.attr('data-theme')
    })

    cy.get('[data-cy="theme-button"]').should('exist').click() // Trocando o tema atual.

    cy.get('body').should('not.be.empty').then($body  => {
      expect(initialThemeOption).not.be.undefined

      expect($body.attr('data-theme')).not.to.equal(initialThemeOption)
    })
  })
})
