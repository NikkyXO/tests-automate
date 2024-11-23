describe('Register Form Tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5173/register');
      });
    
      describe('Form Display', () => {
        it('should display the registration form with all elements', () => {

          cy.get('form').should('exist');
          cy.get('input[placeholder="Username"]').should('be.visible');
          cy.get('input[placeholder="Password"]').should('be.visible');
          cy.get('button').contains('Register').should('be.visible');
 
          cy.contains('Already registered?').should('be.visible');
          cy.get('a').contains('Login').should('be.visible')
            .and('have.attr', 'href', '/');
        });
    
        it('should have proper input types', () => {
          cy.get('input[placeholder="Username"]')
            .should('have.attr', 'type', 'text');
          cy.get('input[placeholder="Password"]')
            .should('have.attr', 'type', 'password');
        });
      });

      describe('Form Validation', () => {
        it('should show error when submitting empty form', () => {
          cy.get('button').contains('Register').click();
          cy.contains('username, password are required').should('be.visible');
        });
    
        it('should show error when only username is provided', () => {
          cy.get('input[placeholder="Username"]').type('testuser');
          cy.get('button').contains('Register').click();
          cy.contains('password is required').should('be.visible');
        });
    
        it('should show error when only password is provided', () => {
          cy.get('input[placeholder="Password"]').type('password123');
          cy.get('button').contains('Register').click();
          cy.contains('username is required').should('be.visible');
        });
      });
    
      describe('Registration Process', () => {
        it('should show loading state during registration', () => {
          cy.get('input[placeholder="Username"]').type('testuser');
          cy.get('input[placeholder="Password"]').type('password123');
          cy.get('button').contains('Register').click();         
          cy.get('.animate-spin').should('be.visible');
        });

        it('should handle successful registration', () => {
          cy.intercept('POST', '/auth/signup', {
            statusCode: 200,
            body: { username: 'newUser' },
          }).as('registerRequest');
    
          // Fill and submit form
          cy.get('input[placeholder="Username"]').type('newUser');
          cy.get('input[placeholder="Password"]').type('password123');
          cy.get('button').contains('Register').click();
    
          cy.wait('@registerRequest', { timeout: 10000 });
    
          cy.contains('Registration successful!').should('be.visible');
          cy.url().should('eq', 'http://localhost:5173/');
        });
    
        it('should handle registration failure', () => {
          cy.intercept('POST', '/auth/signup', {
            statusCode: 400,
            body: { message: 'Username already exists' },
          }).as('registerRequest');
    
          cy.get('input[placeholder="Username"]').type('newUser');
          cy.get('input[placeholder="Password"]').type('password123');
          cy.get('button').contains('Register').click();
    
          cy.wait('@registerRequest');
          cy.contains('Operation failed').should('be.visible');
        });
    
        it('should handle network error', () => {
          cy.intercept('POST', '/auth/signup', {
            forceNetworkError: true
          }).as('registerRequest');
    
          cy.get('input[placeholder="Username"]').type('testuser');
          cy.get('input[placeholder="Password"]').type('password123');
          cy.get('button').contains('Register').click();

          cy.contains('Operation failed').should('be.visible');

        });
      });
    

});