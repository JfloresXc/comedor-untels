describe('Navbar Component', () => {
    beforeEach(() => {
      // Navega a la página principal donde se encuentra la navbar
      cy.visit('/register'); // Cambia esto a la ruta correcta si es necesario
    });
  
    it('should display the navbar title correctly', () => {
      cy.get('.navbar__title').should('contain.text', 'Comedor Untels');
    });
  
    it('should display the login button if not logged in', () => {
      // Asegúrate de que el estado isLogged sea false
      cy.get('.navbar__links a[routerLink="/login"]').should('be.visible');
    });
  
    it('should open the mat-menu on button click', () => {
      cy.get('.navbar__button-toggle').click();
      cy.get('mat-menu').should('be.visible');
    });
  
    it('should navigate to login page on login button click', () => {
      cy.get('.navbar__links a[routerLink="/login"]').click();
      cy.url().should('include', '/login');
    });
  });
  