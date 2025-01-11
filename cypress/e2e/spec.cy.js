describe('Page structure test', () => {
  it('Page loads with structure (navbar, footer, h1 with title)', () => {
    cy.visit('https://travelers-app.netlify.app/');
    cy.get('nav').should("be.visible");
    cy.get('footer').should('be.visible');
  })
  it('Navbar contains H1 with the title of the project "ROUTIFY"', () => {
    cy.visit('https://travelers-app.netlify.app/');
    cy.get('nav').find('h1').contains('ROUTIFY');
  })
  it('Footer contains a link with the text "Cooperate with us"', () => {
    cy.visit('https://travelers-app.netlify.app/');
    cy.get('footer').find('a').contains('Cooperate with us');
  })
})