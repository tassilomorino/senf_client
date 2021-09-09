/** @format */
// const sizes = ["iphone-6", "iphone-8", "ipad-2"];

const sizes = ["iphone-8"];

describe("Test if the Onboarding process works fine", () => {
  sizes.forEach((size) => {
    before(() => {
      cy.viewport(size);
    });
    // make assertions on the logo using
    // an array of different viewports
    it("walks through the onboarding process in mobile", () => {
      // Click on
      cy.wait(500);
      cy.visit("/intro");
    });
  });
});
