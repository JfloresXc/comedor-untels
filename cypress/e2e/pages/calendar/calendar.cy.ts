describe('Calendar Component', () => {
    beforeEach(() => {
      // Navega a la página donde se encuentra el componente
      cy.visit('/menu'); // Cambia esto a la ruta correcta
    });
  
    it('should display the correct month and year in the header', () => {
      const currentDate = new Date();
      const month = currentDate.toLocaleString('default', { month: 'long' }).toUpperCase();
      const year = currentDate.getFullYear().toString().toUpperCase();
  
      cy.get('h1').should('contain.text', `${month} - ${year}`);
    });
  
    it('should change to the previous month when "Mes anterior" button is clicked', () => {
      cy.get('button').contains('Mes anterior').click();
      // Verificar que el mes ha cambiado (esto dependerá de tu lógica de cambio de mes)
      // Aquí podrías necesitar un poco más de lógica para verificar el cambio correcto.
    });
  
    it('should change to the next month when "Mes siguiente" button is clicked', () => {
      cy.get('button').contains('Mes siguiente').click();
      // Verificar que el mes ha cambiado (esto dependerá de tu lógica de cambio de mes)
      // Aquí podrías necesitar un poco más de lógica para verificar el cambio correcto.
    });
  
    it('should display the correct days of the week', () => {
      const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']; // Ajusta según los nombres en tu componente
  
      cy.get('.calendar__dayOfWeek').each((day, index) => {
        cy.wrap(day).should('contain.text', daysOfWeek[index]);
      });
    });
  
    it('should display the correct days of the month', () => {
      cy.get('.calendar__day').should('have.length.greaterThan', 0); // Verifica que hay al menos un día del mes mostrado
  
      // Verifica que cada día tiene un número de día
      cy.get('.calendar__day').each((day) => {
        cy.wrap(day).find('.calendar__numberDay').should('not.be.empty');
      });
    });
  
    it('should show the menu icon for days with menuStorage', () => {
      cy.get('.calendar__day').each((day) => {
        cy.wrap(day).then(($day) => {
          if ($day.find('.calendar__info').length > 0) {
            cy.wrap($day).find('.calendar__point mat-icon').should('have.text', 'check_circle_outline');
          }
        });
      });
    });
  
    it('should open the menu when a day is clicked', () => {
      // Aquí puedes simular la apertura del menú y verificar el comportamiento
      cy.get('.calendar__day').first().click();
      // Verifica que algo suceda al hacer clic, como abrir un modal o cambiar la vista
      // cy.get('.your-menu-selector').should('be.visible');
    });
  });
  