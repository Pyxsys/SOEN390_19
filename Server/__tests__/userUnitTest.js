//const userRouter = require('../src/Routes/Api/UserRoutes');
const User = require('../src/Models/User');
const mongoose = require("mongoose");
const crypto = require('crypto');

/*test("Add a new User", async () => {
    const testUser = new User.Users({
        username:   "dummyTest",
        email:      "dummy@test.com",
        password:   "test1234"});
    
    const response = await request(userRouter).get("/");
    //expect(response).toContain(testUser);
    expect(response.statusCode).toBe(200);
});*/
  
describe('User Unit Testing', () => {

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
    
    beforeAll(done => {
        done();
    });
      
    afterAll(done => {
        // Closing the DB connection allows Jest to exit successfully.
        mongoose.connection.close();
        done();
    });

    // Unit Testing #1: Create and Save a new user into DB
    it('create and save new user', async () => {
        const newTestUser = new User.Users({
            username:   'dummyNewTest',
            email:      'dummy@test.com',
            password:   'test1234',
            salt:       crypto.randomBytes(128).toString('base64'),
            iterations: 1000
        });
        const savedTestUser = await newTestUser.save();
        // actual testing
        expect(savedTestUser._id).toBeDefined; // automatically created by MongoDB when object is successfully added to DB
        expect(savedTestUser.username).toBe(newTestUser.username);
        expect(savedTestUser.email).toBe(newTestUser.email);
        expect(savedTestUser.password).toBe(newTestUser.password);
    });

    // Unit Testing #2: Create a user with a required field missing (email)
    it('create a user with a missing field should fail', async () => {
        const missingFieldTestUser = new User.Users({ // user with missing email
            username:   'dummyMissingTest',
            password:   'test1234',
            salt:       crypto.randomBytes(128).toString('base64'),
            iterations: 1000
        });
        let err;
        try {
            const savedTestUser = await missingFieldTestUser.save(); // this line should produce an error
        } catch (savedTestUser) { // error above is passed to a catch() statement
            err = savedTestUser;
        }
        // actual testing
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.email).toBeDefined();
    });

    // Unit Testing #3: Create a user with a non defined field
    it('create a user with a undefined field should fail', async () => {
        const undefinedFieldTestUser = new User.Users({ // user with undefined field 'age'
        age:        25,
        username:   'dummyMissingTest',
        password:   'test1234',
        email:      'dummy@test.com',
        salt:       crypto.randomBytes(128).toString('base64'),
        iterations: 1000
        });
        const savedTestUser = await undefinedFieldTestUser.save();
        // actual testing
        expect(savedTestUser._id).toBeDefined; // automatically created by MongoDB when object is successfully added to DB
        expect(savedTestUser.age).toBeUndefined(); // it passess which mean fiel 'age' is undefined and not added to DB
    });
    
});

  