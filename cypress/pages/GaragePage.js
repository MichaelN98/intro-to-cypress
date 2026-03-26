class GaragePage {
  ensureAddCarModalOpen() {
    cy.get('body').then(($body) => {
      const modalOpen =
        $body.find('ngb-modal-window .modal-title:contains("Add a car")').length > 0;

      if (!modalOpen) {
        cy.contains('button', 'Add car').click({ force: true });
      }
    });

    cy.contains('.modal-title', 'Add a car').should('be.visible');
  }

  selectBrand(brand) {
    cy.get('#addCarBrand').select(brand);
  }

  selectModel(model) {
    cy.get('#addCarModel').select(model);
  }

  typeMileage(mileage) {
    cy.get('#addCarMileage').clear().type(mileage).blur();
  }

  submitAddCar() {
    cy.get('ngb-modal-window').within(() => {
      cy.contains('button', 'Add').should('not.be.disabled').click();
    });
  }

  addCar({ brand, model, mileage }) {
    this.ensureAddCarModalOpen();
    this.selectBrand(brand);
    this.selectModel(model);
    this.typeMileage(mileage);
    this.submitAddCar();
  }

  verifyCarAdded(brand, model) {
    cy.contains(`${brand} ${model}`).should('be.visible');
  }

  openExpenses() {
    cy.contains('a', 'Fuel expenses').click();
  }
}

export default new GaragePage();