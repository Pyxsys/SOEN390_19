const mongoose = require('mongoose');
const Client = require('../src/Models/Client');
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

    // Unit Testing #1: Create and save a new client into DB
    it('create and save new Client into DB', async () => {
        const newTestBusiness = new Business({
            name:     'Test Name',
            phone:    '514-123-456',
            location: 'Moon'
        });
        const newTestClient = new Client({
            client_name:     'John Doe',
            client_title:    'Mr.',
            name:         newTestBusiness.name,
            phone:        newTestBusiness.phone,
            location:     newTestBusiness.location
        });
        const savedTestClient = await newTestClient.save(); // save into test DB
        // actual testing
        expect(savedTestClient._id).toBeDefined; // automatically created by MongoDB when object is successfully added to DB
        expect(savedTestClient.client_name).toBe(newTestClient.client_name);
        expect(savedTestClient.client_title).toBe(newTestClient.client_title);
        expect(savedTestClient.name).toBe(newTestClient.name);
        expect(savedTestClient.phone).toBe(newTestClient.phone);
        expect(savedTestClient.location).toBe(newTestClient.location);
    });

    // Unit Testing #2: Create a client with a missing inherited field from Business model (missing 'name' field)
    it('create client with missing inherited field from Business model', async () => {
        const newTestBusiness = new Business({ // missing required 'name' field
            phone:    '514-123-456',
            location: 'Moon'
        });
        const newTestClient = new Client({
            client_name:     'John Doe',
            client_title:    'Mr.',
            name:         newTestBusiness.name,
            phone:        newTestBusiness.phone,
            location:     newTestBusiness.location
        });
        let err;
        try {
            const savedTestClient = await newTestClient.save();; // this line should produce an error
        } catch (savedTestClient) { // error above is passed to a catch() statement
            err = savedTestClient;
        }
        // actual testing
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.name).toBeDefined();
    });
});