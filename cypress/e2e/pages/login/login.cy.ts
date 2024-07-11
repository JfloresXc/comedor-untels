/// <reference types="cypress" />

describe('Login Form', () => {
    beforeEach(() => {
      cy.visit('/login');
    });
  
    it('Should display the login form', () => {
      cy.get('.login__title').should('contain.text', 'Iniciar Sesión');
      cy.get('.login__description').should('contain.text', 'Compra más rápido y revisa los detalles de tus compras');
    });
  
    it('Should show errors for empty fields', () => {
      cy.get('button[type="submit"]').click();
      cy.get('mat-error').should('contain.text', 'El correo electrónico es requerido');
      cy.get('mat-error').should('contain.text', 'La contraseña es requerida');
    });
  
    it('Should show error for invalid email', () => {
      cy.get('input[formControlName="email"]').type('invalid-email');
      cy.get('input[formControlName="password"]').type('validPassword');
      cy.get('button[type="submit"]').click();
      cy.get('mat-error').should('contain.text', 'Ingrese un correo electrónico válido');
    });
  
    it('Should show error for short password', () => {
      cy.get('input[formControlName="email"]').type('valid@example.com');
      cy.get('input[formControlName="password"]').type('short');
      cy.get('button[type="submit"]').click();
      cy.get('mat-error').should('contain.text', 'Debe tener 6 caracteres como mínimo');
    });
  
      
    it('Should toggle password visibility', () => {
      cy.get('input[formControlName="password"]').type('validPassword');
      cy.get('button[matSuffix]').click();
      cy.get('input[formControlName="password"]').should('have.attr', 'type', 'text');
      cy.get('button[matSuffix]').click();
      cy.get('input[formControlName="password"]').should('have.attr', 'type', 'password');
    });
  
    it('Should redirect to forgot password page', () => {
      cy.get('button').contains('¿ Olvidaste tu contraseña ?').click();
      cy.url().should('include', '/forgotten'); 
    });
  });
  