
describe("Navigation", () => {
  beforeEach(()=>{
    cy.request('GET', '/api/debug/reset')
  })
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday and click on it", ()=>{
    cy.visit("/");
    cy.contains("li","Tuesday")
    .click()
    .should("have.class","day-list__item--selected");
  })
  

});
