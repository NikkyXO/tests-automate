describe("List All Items Tests", () => {
  describe("List All Items", () => {
    const mockItems = [
      {
        id: "82fe4f8d-c2ad-4f0d-bffa-4fdb55b41d23",
        name: "Item 1",
        description: "Description 1",
        createdAt: "2023-09-10T10:00:00.000Z",
        updatedAt: "2023-09-10T10:00:00.000Z",
        userId: "56fe4f8d-c2ad-4f0d-bffa-4fdb55b41d23",
      },
      {
        id: "83fe4f8d-c2ad-hf0d-bffa-4fdb55b41d23",
        name: "Item 2",
        description: "Description 2",
        createdAt: "2023-09-10T10:00:00.000Z",
        updatedAt: "2023-09-10T10:00:00.000Z",
        userId: "56fe4f8d-c2ad-4f0d-bffa-4fdb55b41d23",
      },
    ];
    beforeEach(() => {
      cy.window().then((win) => {
        win.localStorage.setItem("access_token", "mock-token");
      });
      cy.visit("http://localhost:5173/items");

      cy.intercept("GET", "/items", {
        statusCode: 200,
        body: mockItems,
      }).as("fetchItems");
    });

    it("should load existing items into page", () => {
      cy.get(".animate-spin").should("be.visible");
      cy.wait("@fetchItems");
      cy.get(".animate-spin").should("not.exist");
    });

    it("should load and display the all fetched items", () => {
      cy.wait("@fetchItems");
      mockItems.forEach((item, index) => {
        cy.get("h3.text-lg.font-medium.text-gray-900")
          .eq(index)
          .should("contain.text", item.name);
      });
      mockItems.forEach((item, index) => {
        cy.get("p.text-gray-500")
          .eq(index)
          .should("contain.text", item.description);
      });
    });
  });

  describe("List All Items without any items", () => {
    it("should show 'No items available' if no items are fetched", () => {
      cy.window().then((win) => {
        win.localStorage.setItem("access_token", "mock-token");
      });
      cy.visit("http://localhost:5173/items");
      cy.intercept("GET", "/items", {
        statusCode: 200,
        body: [],
      }).as("fetchEmptyItems");

      cy.wait("@fetchEmptyItems");
      cy.get(".text-center.py-8.text-gray-500").should(
        "contain.text",
        "No items available"
      );
    });
  });
});
