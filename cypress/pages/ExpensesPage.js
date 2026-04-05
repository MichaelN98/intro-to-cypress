class ExpensesPage {
  openAddExpenseModal() {
    cy.contains('button', 'Add an expense').should('be.visible').click();
  }

  typeMileage(mileage) {
    cy.get('#addExpenseMileage').clear().type(mileage).blur();
  }

  typeLiters(liters) {
    cy.get('#addExpenseLiters').clear().type(liters).blur();
  }

  typeTotalCost(totalCost) {
    cy.get('#addExpenseTotalCost').clear().type(totalCost).blur();
  }

  submitAddExpense() {
    cy.get('ngb-modal-window').within(() => {
      cy.contains('button', 'Add').should('not.be.disabled').click();
    });
  }

  addExpense({ mileage, liters, totalCost }) {
    this.openAddExpenseModal();
    this.typeMileage(mileage);
    this.typeLiters(liters);
    this.typeTotalCost(totalCost);
    this.submitAddExpense();
  }

  verifyExpenseAdded(liters, totalCost) {
    cy.contains(`${liters}L`).should('be.visible');
    cy.contains(`${totalCost}`).should('be.visible');
  }
}

export default new ExpensesPage();
