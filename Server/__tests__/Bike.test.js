const mongoose = require('mongoose');
const Bike = require('../src/Models/Bike');

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
    
    beforeAll(done => { // makes sure that all previous tests instance are closed
        done();
    });
      
    afterAll(done => { // closing the DB connection allows Jest to exit successfully.
        mongoose.connection.close();
        done();
    });

    // Unit Test #1: Create and save Bike into DB
    test('create and save a new Bike into DB', async () => {
        const newTestBike = new Bike.Bikes({
            internalId:     'abc123',
            type:           'Mountain Bike',
            price:          400,
            numberOfUnits:  6,
            provider:       'Test Provider',
            bikeDocPath:    './',
            partsList:      [
                {partInternalId: 'frame', amountRequired: 1},
                {partInternalId: 'pedal', amountRequired: 1},
                {partInternalId: 'seat', amountRequired: 1}
            ]
        });
        const savedTestBike = await newTestBike.save(); // save into test DB
        // actual testing
        expect(savedTestBike._id).toBeDefined; // automatically created by MongoDB when object is successfully added to DB
        expect(savedTestBike.internalId).toBe(newTestBike.internalId);
        expect(savedTestBike.type).toBe(newTestBike.type);
        expect(savedTestBike.price).toBe(newTestBike.price);
        expect(savedTestBike.numberOfUnits).toBe(newTestBike.numberOfUnits);
        expect(savedTestBike.provider).toBe(newTestBike.provider);
        expect(savedTestBike.partsList).toBe(newTestBike.partsList);
    })

});