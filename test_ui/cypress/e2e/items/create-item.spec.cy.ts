describe('Create Item Form', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5173/items', {
            onBeforeLoad(win) {
                win.localStorage.setItem('access_token', 'mock-token'); // Simulate storing the token
            },
        });

        cy.intercept('GET', '/items', {
            statusCode: 200,
            body: [{ id: 1, name: 'Item 1', description: 'Description 1' }],
        }).as('fetchItems');

        cy.intercept(
            {
                method: 'POST',
                url: '/items',
                headers: { Authorization: 'Bearer mock-token' }
            },
            { statusCode: 201, body: { success: true } }
        ).as('createItem');
    });

    it('should render Create Item with empty fields', () => {
        cy.get('.animate-spin').should('be.visible');
        cy.wait('@fetchItems');
        cy.get('.animate-spin').should('not.exist');
        cy.get('button').contains('Add Item').click();
        cy.get('input[placeholder="name"]').should('be.empty');
        cy.get('input[placeholder="description"]').should('be.empty');
    });


    it('should create an item successfully', () => {
        cy.get('button').contains('Add Item').click();
        cy.get('input[placeholder="name"]').type('New Item');
        cy.get('input[placeholder="description"]').type('New Description');
        cy.get('button').contains('Create New Item').click();
        cy.wait('@createItem');
        cy.contains('Item created successfully').should('be.visible');
      });

})