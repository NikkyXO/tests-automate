describe('Login Form Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
      });

      describe('Form Display', () => {
        it('should display the login form with all elements', () => {
          cy.get('form').should('exist');
          cy.get('input[placeholder="Username"]').should('be.visible');
          cy.get('input[placeholder="Password"]').should('be.visible');
          cy.get('button').contains('Login').should('be.visible');
    
          // Checking the register link
          cy.contains('Not registered yet?').should('be.visible');
          cy.get('a').contains('Register').should('be.visible')
            .and('have.attr', 'href', '/register');
        });

        it('should have proper input types', () => {
          cy.get('input[placeholder="Username"]').should('have.attr', 'type', 'text');
          cy.get('input[placeholder="Password"]').should('have.attr', 'type', 'password');
        });
      });

      describe('Form Validation', () => {
        it('should show error when submitting an empty form', () => {
          cy.get('button').contains('Login').click();
          cy.contains('username, password are required').should('be.visible');
        });
    
        it('should show error when only username is provided', () => {
          cy.get('input[placeholder="Username"]').type('testuser');
          cy.get('button').contains('Login').click();
          cy.contains('password is required').should('be.visible');
        });
    
        it('should show error when only password is provided', () => {
          cy.get('input[placeholder="Password"]').type('password123');
          cy.get('button').contains('Login').click();
          cy.contains('username is required').should('be.visible');
        });
      });

      describe('Login Process', () => {
        it('should show loading state during login', () => {
          cy.get('input[placeholder="Username"]').type('testuser');
          cy.get('input[placeholder="Password"]').type('password123');
          cy.get('button').contains('Login').click();
    
          cy.get('.animate-spin').should('be.visible');
        });


        it('should handle successful login', () => {
          cy.intercept('POST', '/auth/login', {
            statusCode: 200,
            body: { username: 'testuser' },
          }).as('loginRequest');
    
          // Fill and submit form
          cy.get('input[placeholder="Username"]').type('testuser');
          cy.get('input[placeholder="Password"]').type('password123');
          cy.get('button').contains('Login').click();
    
          cy.wait('@loginRequest');
    
          cy.contains('Login successful!').should('be.visible');
          cy.url().should('eq', 'http://localhost:5173/items');
        });

        it('should handle login failure', () => {
          cy.intercept('POST', '/auth/login', {
            statusCode: 400,
          }).as('loginRequest');
    
          cy.get('input[placeholder="Username"]').type('testuser');
          cy.get('input[placeholder="Password"]').type('wrongpassword');
          cy.get('button').contains('Login').click();
    
          cy.wait('@loginRequest');
          cy.contains('Operation failed').should('be.visible');
        });

        it('should handle network error', () => {
          cy.intercept('POST', '/auth/login', {
            forceNetworkError: true,
          }).as('loginRequest');
    
          cy.get('input[placeholder="Username"]').type('testuser');
          cy.get('input[placeholder="Password"]').type('password123');
          cy.get('button').contains('Login').click();

          cy.contains('Operation failed').should('be.visible');
        });
      })

})