describe('navbar test', () => {
  it('navbar', () => {
    cy.pause()
    cy.visit('http://localhost:3000/')
    cy.get("[data-test='movieHeader']").contains("React Movie App")
  })
})