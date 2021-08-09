describe('When Accessing the Application', () => {
    it('should have a page title of Senf.koeln', () => {
        cy.visit('localhost:3000/');
        cy.title().should('include', 'Senf.koeln');
    });
});
