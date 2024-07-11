describe('Menu Form Component', () => {
    beforeEach(() => {
      // Navega a la página donde se encuentra el componente
      cy.visit('/menu/edit/vBTXEh0uEi8L3UUKk2Yo'); // Cambia esto a la ruta correcta
    });
  
    it('should render the date picker and allow date selection', () => {
      cy.get('mat-form-field').should('exist');
      cy.get('input[matInput]').should('be.visible').click();
      cy.get('mat-calendar').should('be.visible');
      cy.get('mat-calendar mat-month-view table tbody tr td').contains('1').click();
      cy.get('input[matInput]').should('have.value', new Date().getFullYear().toString());
    });
  
    it('should render all the tabs', () => {
      cy.get('mat-tab-group').should('exist');
      cy.get('mat-tab').should('have.length', 3);
      cy.get('mat-tab-label').eq(0).should('contain.text', 'Desayuno');
      cy.get('mat-tab-label').eq(1).should('contain.text', 'Almuerzo');
      cy.get('mat-tab-label').eq(2).should('contain.text', 'Cena');
    });
  
    it('should switch between tabs', () => {
      cy.get('mat-tab-group').should('exist');
      cy.get('mat-tab-label').eq(1).click();
      cy.get('mat-tab-body').should('contain.text', 'Almuerzo');
      cy.get('mat-tab-label').eq(2).click();
      cy.get('mat-tab-body').should('contain.text', 'Cena');
    });
  
    it('should display the correct button text based on idEdit', () => {
      // Suponiendo que idEdit sea inicialmente false
      cy.get('button mat-icon').should('contain.text', 'add');
      cy.get('button p').should('contain.text', 'Añadir Menú');
  
      // Si idEdit es true, necesitarás simular ese estado para probar esta condición
      // Aquí podrías usar cy.window() para manipular el estado directamente
    });
  
    it('should submit the form when the button is clicked', () => {
      cy.get('form').should('exist');
      cy.get('button[type="submit"]').click();
      // Verifica que el formulario se envió correctamente
      // Aquí puedes necesitar verificar algún cambio en la UI o una redirección
    });
  });
  