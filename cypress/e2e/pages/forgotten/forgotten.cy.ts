/// <reference types="cypress" />

describe('Forgot Password Form', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4200/forgotten');
    });
  
    it('Should display the forgot password form', () => {
      cy.get('.login__title').should('contain.text', 'Recuperar contraseña');
      cy.get('.login__description').should('contain.text', 'Compra más rápido y revisa los detalles de tus compras');
    });
  
    it('Should show errors for empty email field', () => {
      cy.get('button[type="submit"]').click();
      cy.get('mat-error').should('contain.text', 'El correo electrónico es requerido');
    });
  
    it('Should show error for invalid email', () => {
      cy.get('input[formControlName="email"]').type('invalid-email');
      cy.get('button[type="submit"]').click();
      cy.get('mat-error').should('contain.text', 'Ingrese un correo electrónico válido');
    });
  
   
  });
  