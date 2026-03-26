import GaragePage from '../pages/GaragePage';
import ExpensesPage from '../pages/ExpensesPage';

describe('Garage and fuel expenses', () => {
  const email = Cypress.env('userEmail');
  const password = Cypress.env('userPassword');

  before(() => {
    cy.register(email, password);
    cy.login(email, password);
  });

  it('should add car in garage and add fuel expense', () => {
    cy.url().should('include', '/panel/garage');

    GaragePage.addCar({
      brand: 'Audi',
      model: 'TT',
      mileage: '120',
    });

    GaragePage.verifyCarAdded('Audi', 'TT');

    GaragePage.openExpenses();

    ExpensesPage.addExpense({
      mileage: '200',
      liters: '20',
      totalCost: '1000',
    });

    ExpensesPage.verifyExpenseAdded('20', '1000');
  });
});
