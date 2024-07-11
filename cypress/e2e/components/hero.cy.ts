describe('Hero Section', () => {
  beforeEach(() => {
    // Visitar la página web donde se encuentra la sección "hero"
    cy.visit('http://localhost:4200/'); 
  });

  it('should display the hero section with title and slogan', () => {
    // Verificar que el título de la sección "hero" esté visible
    cy.get('.hero__title').should('be.visible').and('contain', 'Comedor Untels');

    // Verificar que el slogan de la sección "hero" esté visible
    cy.get('.hero__slogan').should('be.visible').and('contain', 'Famosos por nuestra sazón, seguimos creciendo con la misma línea de sabor y concepto culinario peruano que se mantiene desde el primer día.');
  });

  it('should display the "Ver menú" button and navigate to menu week section', () => {
    // Verificar que el botón "Ver menú" esté visible
    cy.get('.btn').should('be.visible').and('contain', 'Ver menú');

    // Hacer clic en el botón "Ver menú"
    cy.get('.btn').click();

    // Verificar que la URL cambie para incluir "#menu-week"
    cy.url().should('include', '#menu-week');
  });

  it('should have an overlay with correct style', () => {
    // Verificar que la superposición (overlay) esté presente y tenga el estilo correcto
    cy.get('.overlay')
      .should('exist')
      .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.75)');
  });
  
});
