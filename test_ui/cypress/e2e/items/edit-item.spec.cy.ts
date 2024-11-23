
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
    cy.visit("http://localhost:5173/items", {
      onBeforeLoad(win) {
        win.localStorage.setItem("access_token", "mock-token");
      },
    });

    cy.intercept("GET", "/items", {
      statusCode: 200,
      body: [mockItem],
    }).as("fetchItems");

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
    cy.get('.animate-spin').should('be.visible');
    cy.wait("@fetchItems");
    cy.get('.animate-spin').should('not.exist');
    cy.get("button").contains("View Item").click();
    cy.get("button").contains("Edit").click();

    cy.get('input[placeholder="name"]').should('be.empty');
        cy.get('input[placeholder="description"]').should('be.empty');
  });

  it("should update the item successfully", () => {
    cy.get('.animate-spin').should('be.visible');
    cy.wait("@fetchItems");
    cy.get('.animate-spin').should('not.exist');
    cy.get("button").contains("View Item").click();
    cy.get("button").contains("Edit").click();

    cy.get('input[placeholder="description"]')
      .clear()
      .type("Updated Description");
    cy.get('input[placeholder="name"]').clear().type("Updated Item");

    cy.get("button").contains("Update Item").click();

    cy.wait("@editItem");
    cy.contains("Update Successful!").should("be.visible");
  });
});
