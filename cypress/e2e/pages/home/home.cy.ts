/// <reference types="cypress" />

describe('Comedor Untels Website', () => {
  beforeEach(() => {
      cy.visit('http://localhost:4200/');
  });

  describe('Navbar Component', () => {
      it('Should display login link when not logged in', () => {
          cy.get('.navbar__links a').contains('Iniciar Sesión').should('be.visible');
      });

      it('Should redirect to login page when "Iniciar Sesión" is clicked', () => {
          cy.get('.navbar__links a').contains('Iniciar Sesión').click();
          cy.url().should('include', '/login');
      });

      it('Should not display user-specific links when not logged in', () => {
          cy.get('.navbar__links').should('not.contain', 'Carrito de compras');
          cy.get('.navbar__links').should('not.contain', 'Registros');
          cy.get('.navbar__links').should('not.contain', 'Usuarios');
          cy.get('.navbar__links').should('not.contain', 'Platillos');
          cy.get('.navbar__links').should('not.contain', 'Ver Menú');
          cy.get('.navbar__links').should('not.contain', 'Logout');
      });

      context('When logged in as usuario', () => {
          beforeEach(() => {
              cy.window().then((win) => {
                  (win as any).isLogged = true;
                  (win as any).validateNav = (roles) => roles.includes('usuario');
              });
              cy.reload();
          });

          it('Should not display admin-specific links', () => {
              cy.get('.navbar__links').should('not.contain', 'Usuarios');
              cy.get('.navbar__links').should('not.contain', 'Platillos');
              cy.get('.navbar__links').should('not.contain', 'Ver Menú');
          });
      });

      context('When logged in as administrador', () => {
          beforeEach(() => {
              cy.window().then((win) => {
                  (win as any).isLogged = true;
                  (win as any).validateNav = (roles) => roles.includes('administrador');
              });
              cy.reload();
          });

          it('Should not display user-specific links', () => {
              cy.get('.navbar__links').should('not.contain', 'Carrito de compras');
              cy.get('.navbar__links').should('not.contain', 'Registros');
          });
      });

      context('Responsive Design', () => {
          it('Should display menu button on small screens', () => {
              cy.viewport(500, 800);
              cy.get('.navbar__button-toggle').should('be.visible');
          });

          it('Should hide links on small screens', () => {
              cy.viewport(500, 800);
              cy.get('.navbar__links').should('not.be.visible');
          });
      });
  });

  describe('Hero Section', () => {
      it('should display the hero section with title and slogan', () => {
          cy.get('.hero__title').should('be.visible').and('contain', 'Comedor Untels');
          cy.get('.hero__slogan').should('be.visible').and('contain', 'Famosos por nuestra sazón, seguimos creciendo con la misma línea de sabor y concepto culinario peruano que se mantiene desde el primer día.');
      });

      it('should display the "Ver menú" button and navigate to menu week section', () => {
          cy.get('.btn').should('be.visible').and('contain', 'Ver menú');
          cy.get('.btn').click();
          cy.url().should('include', '#menu-week');
      });

      it('should have an overlay with correct style', () => {
          cy.get('.overlay')
              .should('exist')
              .and('have.css', 'background-color', 'rgba(0, 0, 0, 0.75)');
      });
  });

  describe('About Us Component', () => {
      it('Should display the title and description', () => {
          cy.get('.info__title').should('contain.text', 'Sobre nosotros');
          cy.get('.info__description').should('be.visible')
              .and('contain.text', 'Somos Comedor Untels, un agradable lugar que le permitirá a usted disfrutar de la mejor comida peruana y saborear exquisitos platos criollos.');
      });

      it('Should display the logo image with correct alt text', () => {
          cy.get('.info__image').should('be.visible')
              .and('have.attr', 'src', 'assets/UntelsLogo.png')
              .and('have.attr', 'alt', 'Untels Logo');
      });
  });

  describe('Footer Component', () => {
      it('Should display the brand name and description', () => {
          cy.get('.footer__brand').should('contain.text', 'Comedor Untels');
          cy.get('.footer__description').should('be.visible')
              .and('contain.text', 'Famosos por nuestra sazón');
      });

      it('Should display the contact information', () => {
          cy.get('.footer__items-title').should('contain.text', 'Contáctanos');

          cy.get('.footer__items').within(() => {
              cy.get('.footer__item').eq(0).should('contain.text', '715-8878 anexo 144');
              cy.get('.footer__item').eq(1).should('contain.text', 'comedoruntels@untels.edu.pe');
              cy.get('.footer__item').eq(2).should('contain.text', 'Av. Bolívar S/N, sector 3 grupo 1, mz. A, sublote 3 - Villa El Salvador');
          });
      });
  });
});
