describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    cy.get("[alt=Add]").first().click();
    cy.get('[data-testid="student-name-input"]').type("Lydia Miller-Jones");

    cy.get(":nth-child(1) > .interviewers__item-image").click();

    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
  });

  it("should edit an interview", () => {
    cy.visit("/");
    cy.contains("Monday");
    cy.get(".appointment__actions-button").first().invoke("show").click();
    cy.get('[data-testid="student-name-input"]')
      .clear()
      .type("Lydia Miller-Jones");
    cy.get(":nth-child(1) > .interviewers__item-image").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
  });

  it("should delete an interview", () => {
    cy.get("[alt=Delete]").first().click({ force: true });
    cy.contains("Confirm").click();
    // cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
