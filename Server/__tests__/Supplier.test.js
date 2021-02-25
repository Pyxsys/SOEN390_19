const mongoose = require('mongoose');
const Supplier = require('../src/Models/Supplier');
const Business = require('../src/Models/Business');

describe('Client Unit Tests', () => {

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
    
    beforeAll(done => { // makes sur that all previous tests instance are closed
        done();
    });
      
    afterAll(done => { // closing the DB connection allows Jest to exit successfully.
        mongoose.connection.close();
        done();
    });

    // Unit Testing #1: Create and save a new supplier into DB
    it('create and save new Supplier into DB', async () => {
        const newTestBusiness = new Business({ // creating parent object Business
            name:     'Test Name',
            phone:    '514-123-456',
            location: 'Moon'
        });
        const arrayCatalogue = [  // creating array of catalogue used in Supplier schema
            {internalId: 1, availableUnits: 5},
            {internalId: 2, availableUnits: 10}
        ];
        const newTestSupplier = new Supplier.Suppliers({
            description:  'This is a test supplier',
            catalogue:    arrayCatalogue,
            name:         newTestBusiness.name,
            phone:        newTestBusiness.phone,
            location:     newTestBusiness.location
        });
        const savedTestSupplier = await newTestSupplier.save(); // save into test DB
        // actual testing
        expect(savedTestSupplier._id).toBeDefined; // automatically created by MongoDB when object is successfully added to DB
        expect(savedTestSupplier.description).toBe(newTestSupplier.description);
        expect(savedTestSupplier.catalogue).toBe(newTestSupplier.catalogue);
        expect(savedTestSupplier.name).toBe(newTestSupplier.name);
        expect(savedTestSupplier.phone).toBe(newTestSupplier.phone);
        expect(savedTestSupplier.location).toBe(newTestSupplier.location);
    });
});