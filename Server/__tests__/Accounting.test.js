const mongoose = require('mongoose');
const Accounting = require('../src/Models/Accounting');

describe('Accounting Unit Tests', () => {

    beforeEach((done) => { // called before each test to create a temporary DB
        mongoose.connect("mongodb://localhost:27017/JestDB",
          { useNewUrlParser: true, useUnifiedTopology: true },
          () => done());
    });
      
    afterEach((done) => { // called after each test to remove the data once the test is complete
        mongoose.connection.db.dropDatabase(() => {
          mongoose.connection.close(() => done())
        });
    });
    
    beforeAll(done => { // makes sure that all previous tests instance are closed
        done();
    });
      
    afterAll(done => { // closing the DB connection allows Jest to exit successfully.
        mongoose.connection.close();
        done();
    });

    // Unit Test #1: Create and save Accounting object into DB
    test('create and save a new Accounting object into DB', async () => {
        const newTestAccounting = new Accounting.Accounting({
            internalId:     'abc123',
            item:           'JHX123',
            price:          200,
            numberOfUnits:  30,
            client:         'John Doe'
        });
        const savedTestAccounting = await newTestAccounting.save(); // save into test DB
        // actual testing
        expect(savedTestAccounting._id).toBeDefined; // automatically created by MongoDB when object is successfully added to DB
        expect(savedTestAccounting.internalId).toBe(newTestAccounting.internalId);
        expect(savedTestAccounting.item).toBe(newTestAccounting.item);
        expect(savedTestAccounting.price).toBe(newTestAccounting.price);
        expect(savedTestAccounting.numberOfUnits).toBe(newTestAccounting.numberOfUnits);
        expect(savedTestAccounting.client).toBe(newTestAccounting.client);
    })

});