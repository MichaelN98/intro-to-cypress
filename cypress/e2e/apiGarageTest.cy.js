import GaragePage from '../pages/GaragePage';
import ExpensesPage from '../pages/ExpensesPage';

describe('Garage car creation and expenses - API + UI', () => {
    const email = `mike+api${Date.now()}@test.com`;
    const password = 'Qwerty123';
    let carId;

    before(() => {
        // Register new user via API
        cy.request({
            method: 'POST',
            url: '/api/auth/signup',
            auth: { username: 'guest', password: 'welcome2qauto' },
            body: {
                name: 'John',
                lastName: 'Doe',
                email,
                password,
                repeatPassword: password,
            },
        });

        // Login via API to set session cookie for all subsequent requests
        cy.request({
            method: 'POST',
            url: '/api/auth/signin',
            auth: { username: 'guest', password: 'welcome2qauto' },
            body: { email, password },
        });

        // Navigate to garage page using the established session
        cy.visit('/panel/garage', {
            auth: { username: 'guest', password: 'welcome2qauto' },
        });

        cy.url().should('include', '/panel/garage');
    });

    // ─────────────────────────────────────────────────────────────────────────
    // Task 1: Add car via UI, intercept POST /api/cars response,
    //         validate status code, save car id to variable
    // ─────────────────────────────────────────────────────────────────────────
    it('should add car via UI, intercept POST /api/cars and save car id', () => {
        cy.intercept('POST', '/api/cars').as('createCar');

        GaragePage.addCar({ brand: 'Audi', model: 'TT', mileage: '120' });

        cy.wait('@createCar').then(({ response }) => {
            expect(response.statusCode).to.eq(201);
            expect(response.body.status).to.eq('ok');

            carId = response.body.data.id;
            expect(carId).to.be.a('number');
        });

        GaragePage.verifyCarAdded('Audi', 'TT');
    });

    // ─────────────────────────────────────────────────────────────────────────
    // Task 2: GET /api/cars - validate the created car is in the list
    //         by id (from interception), brand, model, mileage (from UI)
    // ─────────────────────────────────────────────────────────────────────────
    it('should GET /api/cars and validate created car by id, brand, model and mileage', () => {
        cy.request({
            method: 'GET',
            url: '/api/cars',
            auth: { username: 'guest', password: 'welcome2qauto' },
        }).then(({ status, body }) => {
            expect(status).to.eq(200);
            expect(body.status).to.eq('ok');

            const car = body.data.find((c) => c.id === carId);

            expect(car, `Car with id=${carId} should be present in the list`).to.exist;
            expect(car.brand).to.eq('Audi');
            expect(car.model).to.eq('TT');
            expect(car.mileage).to.eq(120);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // Task 3: Create expense via API using custom command cy.createExpenseViaApi
    //         Validate status code and response body fields
    // ─────────────────────────────────────────────────────────────────────────
    it('should create expense via cy.createExpenseViaApi and validate response', () => {
        const today = new Date().toISOString().split('T')[0];

        cy.createExpenseViaApi({
            carId,
            reportedAt: today,
            mileage: 200,
            liters: 20,
            totalCost: 1000,
            forceMileage: false,
        }).then(({ status, body }) => {
            expect(status).to.eq(200);
            expect(body.status).to.eq('ok');

            expect(body.data.carId).to.eq(carId);
            expect(body.data.mileage).to.eq(200);
            expect(body.data.liters).to.eq(20);
            expect(body.data.totalCost).to.eq(1000);
            expect(body.data.reportedAt).to.eq(today);
        });
    });

    // ─────────────────────────────────────────────────────────────────────────
    // Task 4: UI test - find the car on the Expenses page
    //         and validate the expense created via API
    // ─────────────────────────────────────────────────────────────────────────
    it('should find Audi TT in UI Expenses page and validate expense created via API', () => {
        GaragePage.openExpenses();

        cy.url().should('include', '/panel/expenses');
        cy.contains('button', 'Audi TT').click();

        ExpensesPage.verifyExpenseAdded('20', '1000');
    });
});
