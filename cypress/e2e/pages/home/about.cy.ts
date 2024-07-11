/// <reference types="cypress" />

describe('Info Hero Component', () => {
    beforeEach(() => {
      // Navega a la página donde se encuentra el componente
      cy.visit('/path-to-your-component'); // Cambia esto a la ruta correcta
    });
  
    it('should display the title "Sobre nosotros"', () => {
      cy.get('.info__title').should('contain.text', 'Sobre nosotros');
    });
  
    it('should display the correct description text', () => {
      const descriptionText = `Somos Comedor Untels, un agradable lugar que le permitirá a usted
        disfrutar de la mejor comida peruana y saborear exquisitos platos
        criollos. Tenemos una trayectoria de 15 años atendiendo a todo tipo de
        clientes, a quienes ofrecemos un trato amable, cordial y ordenado. Estamos
        en Villa el Salvador. Somos un restaurante especializado en platos
        nutritivos para el desorrollo físico y psicológico, con una carta variada
        para todo tipo de gustos.`;
  
      cy.get('.info__description').should('contain.text', descriptionText);
    });
  
    it('should display the image with the correct src and alt attributes', () => {
      cy.get('.info__image')
        .should('have.attr', 'src', 'assets/UntelsLogo.png')
        .and('have.attr', 'alt', 'Untels Logo');
    });
  });