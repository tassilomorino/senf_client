/** @format */

describe("User that wants to post or delete an idea", () => {
  before(() => {
    cy.setCookie("Cookie_settings", "all");
    cy.visit("/");
  });

  // overall logic and tests to be done:
  // 1) NOT LOGGED IN 
  // 1.a) post an idea => fail
  // 1.b) delete an idea => fail
  // 2) LOG IN
  // 2.a) post an idea => success
  // 2.b) delete an idea => success

  describe("and is logged in", () => {

    it("posts an idea", () => {
      //PR IS IN THE PIPELINE TO FIX ISSUES ABOUT THE GEOCODER
      //FOR THIS TEST THE LOGIN PROCESS NEEDS TO BE DONE FIRST...
      //click on the button "+ New idea" within sidebar
      //cy
      //Check if ...?
      //cy
      //Switch between projects and check if that is working fine
      //cy
      //Move the Map
      //cy
      //Check if address is changing in the address-bar
      //cy
      //Click into address-bar
      //cy
      //Type for an eg. "Rennebergstr" and select the first suggestion and hit enter
      //cy
      //Check if map moves to address
      //cy
      //Check if address is updating in the address-bar
      //cy
      //Click button "Confirm location"
      //cy
      //Check if address from address-bar is also in the card
      //cy
      //Click the selectLocationContainer to go back
      //cy
      //Click button "No location"
      //cy
      //Check if address in the card is updated to "Without Location"
      //cy
      //Check if the submitButton is disabled (it shall be disabled)
      //cy

      // ***QUESTION: maybe there are projects without a specific location? e.g. incentive to have plants on balcony, or adding chargers for eBikes...

      //Click into input field title
      //cy
      //Type for an eg. "Test-idea from Cypress"
      //cy
      //Check if the submitButton is disabled (it shall be disabled)
      //cy
      //Click into input field body
      //cy
      //Type for an eg. "Test-Body from Cypress"
      //cy
      //Check if the submitButton is disabled (it shall not be disabled)
      //cy
      //Select topic and check if that is working
      //cy
      //Click the submitButton
      //cy
      //Check if you are being redirected to the idea you just created
      //cy
    });

    it("deletes an idea", () => {

    });

  })

  describe("and is NOT logged in", () => {

    it("tries to post an idea", () => {

    });

    it("tries to delete an idea", () => {

    });

  })



});
