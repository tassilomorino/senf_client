/** @format */

describe("Testing posting and deleting an idea", () => {
  before(() => {
    cy.setCookie("Cookie_settings", "all");
    cy.visit("/");
  });

  it("inspecting if posting an idea is working fine, then if you can  also delete it", () => {
    //Component for adding an idea is not working correcctly at the moment. Geocoder needs to be fixed
  });
});
