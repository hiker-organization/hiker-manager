describe('Listagem de Usuários | Cypress', () => {
  it('Carregamento da Listagem', () => {
    cy.visit('http://localhost:5173/users')

    cy.get('body').should('not.be.empty').then(() => {
      cy.log('Aplicação carregada corretamente.')
    })

    // Em breve...
  })
})
