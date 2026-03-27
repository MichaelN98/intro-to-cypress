class ExpensesPage {
    verifyExpenseAdded(liters, totalCost) {
        cy.contains(`${liters}L`).should('be.visible');
        cy.contains(`${totalCost}`).should('be.visible');
    }
}

export default new ExpensesPage();
