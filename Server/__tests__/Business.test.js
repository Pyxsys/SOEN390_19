const mongoose = require('mongoose');
const Business = require('../src/Models/Business');

describe('Business Unit Tests', () => {

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

    // Unit Testing #1: Create and Save a new Business into DB
    test('create and save new Business into DB', async () => {
        const newTestBusiness = new Business({
            name:     'Test Name',
            phone:    '514-123-456',
            location: 'Moon'
        })
        const savedTestBusiness = await newTestBusiness.save();
        // actual testing
        expect(savedTestBusiness._id).toBeDefined; // automatically created by MongoDB when object is successfully added to DB
        expect(savedTestBusiness.name).toBe(newTestBusiness.name);
        expect(savedTestBusiness.phone).toBe(newTestBusiness.phone);
        expect(savedTestBusiness.location).toBe(newTestBusiness.location);
    })
});