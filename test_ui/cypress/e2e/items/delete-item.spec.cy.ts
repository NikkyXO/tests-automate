describe("Delete Item Tests", () => {
  const mockItem = {
    id: "d4a37b9c-e9fd-4f08-b1fc-b34712b8a2d4",
    createdAt: "2024-11-22T15:06:16.671Z",
    updatedAt: "2024-11-22T15:22:14.762Z",
    deletedAt: null,
    name: "Tornado45",
    description: "Tornado45",
    userId: "07b2d3cc-211e-4694-a17f-849b2601cfbc",
  };

  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem("access_token", "mock-token");
    });
    cy.visit(`http://localhost:5173/items/${mockItem.id}`);
    
    cy.intercept('GET', `/items/${mockItem.id}`, {
        statusCode: 200,
        body: mockItem,
    }).as('getItemDetail');

    cy.intercept('GET', '/items', {
      statusCode: 200,
      body: [{ id: 1, name: 'Item 1', description: 'Description 1' }],
  }).as('fetchItems');
  });

  it("should load existing item into the page", () => {
    cy.wait("@getItemDetail");
    cy.get("button").contains("Edit").should("be.visible");
    cy.get("button").contains("Delete").should("be.visible");
  });

  it("should display item details correctly", () => {
    cy.wait("@getItemDetail");
    cy.get("h1.text-2xl.mx-auto").contains(mockItem.name).should("be.visible");
    cy.get("p.text-lg.mx-auto")
      .contains(mockItem.description)
      .should("be.visible");
    cy.get("p").contains(`Created by: ${mockItem.userId}`).should("be.visible");
    cy.get("p")
      .contains(`Created At: ${mockItem.createdAt}`)
      .should("be.visible");
    cy.get("p")
      .contains(`Updated At: ${mockItem.updatedAt}`)
      .should("be.visible");
  });

  it("should delete the item", () => {
    cy.intercept("DELETE", `/items/${mockItem.id}`, {
      statusCode: 200,
      body: { success: true },
    }).as("deleteItem");


    cy.get("button").contains("Delete").should("be.visible");
    cy.get("button").contains("Delete").click();
    cy.wait("@deleteItem");
    cy.get(".animate-spin").should("not.exist");

    cy.wait("@fetchItems");
    cy.url().should("eq", "http://localhost:5173/items");
  });
});
