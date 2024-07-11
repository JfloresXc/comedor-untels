describe('Food List Component', () => {
    beforeEach(() => {
      // Navega a la página donde se encuentra el componente food-list
      cy.visit('/food-list'); // Cambia esto a la ruta correcta si es necesario
    });
  
    it('should display the title correctly', () => {
      cy.get('.food-list__title').should('contain.text', 'Platillos');
    });
  
    it('should have a functional search input', () => {
      cy.get('.food-list__input-search input').should('have.attr', 'placeholder', 'Busca alguno aquí');
    });
  
    it('should display foods correctly', () => {
      cy.get('.food-list .row .col-lg-3').should('have.length.greaterThan', 0);
    });
  
    it('should filter foods based on search input', () => {
      const searchTerm = 'exampleFoodName'; // Cambia esto a un nombre de platillo que exista en tu aplicación
  
      // Escribe en la barra de búsqueda
      cy.get('.food-list__input-search input').type(searchTerm);
  
      // Verifica que el método handleChangeFoods se llama
      // Esto podría necesitar un stub si el método realiza una llamada a una API o realiza otra lógica compleja
  
      // Verifica que los resultados se filtren correctamente
      cy.get('.food-list .row .col-lg-3').each(($el) => {
        cy.wrap($el).should('contain.text', searchTerm);
      });
  
      // Limpia la búsqueda
      cy.get('.food-list__input-search button[aria-label="Clear"]').click();
      cy.get('.food-list__input-search input').should('have.value', '');
    });
  
    it('should clear search input when clear button is clicked', () => {
      cy.get('.food-list__input-search input').type('exampleFoodName');
      cy.get('.food-list__input-search button[aria-label="Clear"]').click();
      cy.get('.food-list__input-search input').should('have.value', '');
    });
  
    it('should display all foods when search input is cleared', () => {
      const initialFoodCount = Cypress.$('.food-list .row .col-lg-3').length;
  
      cy.get('.food-list__input-search input').type('exampleFoodName');
      cy.get('.food-list .row .col-lg-3').should('have.length.lessThan', initialFoodCount);
  
      cy.get('.food-list__input-search button[aria-label="Clear"]').click();
      cy.get('.food-list .row .col-lg-3').should('have.length', initialFoodCount);
    });
  });
  