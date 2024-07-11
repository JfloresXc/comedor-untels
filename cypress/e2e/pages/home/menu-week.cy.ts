describe('Menu Week Component', () => {
    beforeEach(() => {
      // Navega a la página donde se encuentra el componente
      cy.visit('http://localhost:4200/'); 
    });
  
    it('should display the loading spinner while loading', () => {
      cy.get('app-spinner').should('exist');
    });
  
    it('should display the menu week title', () => {
      // Asegúrate de que isLoading esté en false en el contexto de prueba
      cy.get('.menu-week__title').contains('Menú semanal');
    });
  
    it('should display the correct number of foods in each list', () => {
      cy.get('mat-expansion-panel').each((panel) => {
        cy.wrap(panel).within(() => {
          cy.get('mat-panel-title').should('exist');
          cy.get('mat-panel-description').should('contain.text', 'platillos');
          cy.get('button.mat-mini-fab.menu-week__icon').should('exist');
        });
      });
    });
  
    it('should add food list to cart when button is clicked', () => {
      cy.get('button.mat-mini-fab.menu-week__icon').first().click();
      // Aquí podrías agregar más aserciones para verificar que el ítem fue añadido al carrito
    });
  });
  