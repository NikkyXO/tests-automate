describe("Edit Item Form Tests", () => {
  const mockItem = {
    id: "82fe4f8d-c2ad-4f0d-bffa-4fdb55b41d23",
    name: "Item 1",
    description: "Description 1",
    createdAt: "2023-09-10T10:00:00.000Z",
    updatedAt: "2023-09-10T10:00:00.000Z",
    userId: "56fe4f8d-c2ad-4f0d-bffa-4fdb55b41d23",
  };

  beforeEach(() => {
    cy.visit(`http://localhost:5173/items/${mockItem.id}`, {
      onBeforeLoad(win) {
        win.localStorage.setItem("access_token", "mock-token");
      },
    });

    cy.intercept('GET', `/items/${mockItem.id}`, {
        statusCode: 200,
        body: mockItem,
    }).as('getItemDetail');

    cy.intercept('GET', '/items', {
        statusCode: 200,
        body: [{ id: 1, name: 'Item 1', description: 'Description 1' }],
    }).as('fetchItems');


    cy.intercept(
      {
        method: "PATCH",
        url: `/items/${mockItem.id}`,
        headers: { Authorization: "Bearer mock-token" },
      },
      { statusCode: 201, body: { success: true } }
    ).as("editItem");
  });
  

  it("should load existing item into the form", () => {
    cy.wait("@getItemDetail");
    cy.get("button").contains("Edit").click();

    cy.get('input[placeholder="name"]').should("be.empty");
    cy.get('input[placeholder="description"]').should("be.empty");
  });

  it("should update the item successfully", () => {
    cy.get("button").contains("Edit").click();

    cy.get('input[placeholder="description"]')
      .clear()
      .type("Updated Description");
    cy.get('input[placeholder="name"]').clear().type("Updated Item");

    cy.get("button").contains("Update Item").click();

    cy.wait("@editItem");
    cy.wait("@fetchItems");
    cy.contains("Update Successful!").should("be.visible");
  });
});
