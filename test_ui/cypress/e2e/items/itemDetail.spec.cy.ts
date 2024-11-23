describe("Item Details Tests", () => {
  const mockItem = {
    id: "82fe4f8d-c2ad-4f0d-bffa-4fdb55b41d23",
    name: "Item 1",
    description: "Description 1",
    createdAt: "2023-09-10T10:00:00.000Z",
    updatedAt: "2023-09-10T10:00:00.000Z",
    userId: "56fe4f8d-c2ad-4f0d-bffa-4fdb55b41d23",
  };

  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem("access_token", "mock-token");
    });
      cy.visit("http://localhost:5173/items");

    cy.intercept("GET", "/items", {
      statusCode: 200,
      body: [mockItem],
    }).as("fetchItems");

    cy.intercept(
      {
        method: "GET",
        url: `/items/${mockItem.id}`,
        headers: { Authorization: "Bearer mock-token" },
      },
      { statusCode: 201, body: { success: true } }
    ).as("getItemDetail");

  });

  it("should load existing item into the page", () => {
    cy.get(".animate-spin").should("be.visible");
    cy.wait("@fetchItems");
    cy.get(".animate-spin").should("not.exist");
    cy.get("button").contains("View Item").click();

    cy.get("p").contains(`Created by: ${mockItem.userId}`).should("be.visible");
    cy.get("p").contains(`Created At: ${mockItem.createdAt}`).should("be.visible");
    cy.get("p").contains(`Updated At: ${mockItem.updatedAt}`).should("be.visible");

    cy.get("button").contains("Edit").should("be.visible");
    cy.get("button").contains("Delete").should("be.visible");
  });
});
