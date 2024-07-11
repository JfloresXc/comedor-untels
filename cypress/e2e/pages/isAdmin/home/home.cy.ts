describe('Login Test for Administrator with Firebase', () => {
  it('should log in as ADMINISTRATOR', () => {
    // Visita la página de login
    cy.visit('/login');
    
    // Ingresa el correo electrónico
    cy.get('input[formcontrolname="email"]').type('1923110141@untels.edu.pe');
    
    // Ingresa la contraseña
    cy.get('input[formcontrolname="password"]').type('1923110141');
    
    // Haz clic en el botón de iniciar sesión
    cy.get('button[type="submit"]').click();
        
    // Verifica la presencia del userID en el local storage de manera dinámica
    cy.window().should((window) => {
      const userID = window.localStorage.getItem('userId');
      expect(userID).to.exist;
      expect(userID).to.equal('fL0gz8EOQUODXyFUzUDXr3fBRQG2'); 
    });
  });
});
