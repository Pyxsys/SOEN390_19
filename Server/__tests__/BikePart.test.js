const mongoose = require('mongoose');
const BikePart = require('../src/Models/BikePart');

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

    // Unit Test #1: Creat and save Bike into DB
    it('create and save a new BikePart into DB', async () => {
        const newTestBikePart = new BikePart.BikeParts({
            internalId:       'abc123', 
            partType:         'Handlebars',
            price:            45,
            numberOfUnits:    20,
            provider:         'Test Provider',  //refer to supplier

            partDocPath:      './', //Path to .pdf file
            partStepPath:     './'
        })
        const savedTestBikePart = await newTestBikePart.save(); // save into test DB
        // actual testing
        expect(savedTestBikePart._id).toBeDefined; // automatically created by MongoDB when object is successfully added to DB
        expect(savedTestBikePart.internalId).toBe(newTestBikePart.internalId);
        expect(savedTestBikePart.partType).toBe(newTestBikePart.partType);
        expect(savedTestBikePart.price).toBe(newTestBikePart.price);
        expect(savedTestBikePart.numberOfUnits).toBe(newTestBikePart.numberOfUnits);
        expect(savedTestBikePart.provider).toBe(newTestBikePart.provider);
        expect(savedTestBikePart.partDocPath).toBe(newTestBikePart.partDocPath);
        expect(savedTestBikePart.partStepPath).toBe(newTestBikePart.partStepPath);
    });
});