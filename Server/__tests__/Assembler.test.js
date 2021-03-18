    const mongoose = require('mongoose');
    const Assembler = require('../src/Models/Assembler');
    const BikePart = require('../src/Models/BikePart');
    const Bike = require('../src/Models/Bike');

    describe('Assembler Unit Tests', () => {

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

        // Unit Testing #1: ensurePartsAvailable() throws error when a part is not found in db.
        test('throws error when a part is not found in db', async () => {
            const testBike = new Bike.Bikes({ // creating a BikePart object that we will NOT save in DB
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
            // actual testing
            expect(Assembler.ensurePartsAvailable(testBike.partsList)).rejects.toThrow(); // rejects key word necessary when Promises are used
        });

        // Unit Testing #2: assembleBike() throws error when parameter requested_amount is set as a non-positive number
        test('returns 0 when parameter requested_amount is set as a non-positive number', async () => {
            const testBike = new Bike.Bikes({
                internalId:     'abc123',
                type:           'Mountain Bike',
                price:          400,
                numberOfUnits:  6,
                provider:       'Test Provider',
                bikeDocPath:    './',
                partsList:      [
                    {partInternalId: 'frame', amountRequired: 10},
                    {partInternalId: 'pedal', amountRequired: 10},
                    {partInternalId: 'seat', amountRequired: 10}
                ]
            });
            const savedBike = await testBike.save();
            const result = await Assembler.assembleBike(savedBike.internalId, -3);
            
            // actual testing
            expect(result).toBe(0);
            });

        // Unit Testing #3: assembleBike() throws error when given an internalID not found in the bike collections.
        test('throws error when given an internalID not found in the bike collections', async () => {
            const testBike = new Bike.Bikes({
                internalId:     'abc123',
                type:           'Mountain Bike',
                price:          400,
                numberOfUnits:  6,
                provider:       'Test Provider',
                bikeDocPath:    './',
                partsList:      [
                    {partInternalId: 'frame', amountRequired: 10},
                    {partInternalId: 'pedal', amountRequired: 10},
                    {partInternalId: 'seat', amountRequired: 10}
                ]
            });
            const savedBike = await testBike.save();
            const result = await Assembler.assembleBike('unknown ID', 5);
            // actual testing
            expect(result).toBe(0);
        });

        
        
        
        // TODO
        // Unit Testing: ensurePartsAvailable() throws error when there are insufficient parts to produce a single bike.
    /* test('throws error when there are insufficient parts to produce a single bike', async () => {
            const testBike = new Bike.Bikes({
                internalId:     'abc123',
                type:           'Mountain Bike',
                price:          400,
                numberOfUnits:  6,
                provider:       'Test Provider',
                bikeDocPath:    './',
                partsList:      [
                    {partInternalId: 'frame', amountRequired: 10},
                    {partInternalId: 'pedal', amountRequired: 10},
                    {partInternalId: 'seat', amountRequired: 10}
                ]
            });
            const savedBike = await testBike.save();
            
            //expect(savedBike.partsList[0].partInternalId).toBe('frame');
            const testPartsList = [
                {partInternalId: 'frame', amountRequired: 1},
                {partInternalId: 'pedal', amountRequired: 1},
                {partInternalId: 'seat', amountRequired: 1}
            ];
            const result = await Assembler.ensurePartsAvailable(testPartsList, 6);
            

            expect(await Assembler.ensurePartsAvailable(savedBike.partsList, 6)).toThrow(); // rejects key word necessary when Promises are used
        });*/

        // Unit Testing: ensurePartsAvailable() returns a result with insufficient_parts set as true when min_possible_assemblies is less than requested_amount.
        /*test('returns a result with insufficient_parts set as true when min_possible_assemblies is less than requested_amount', async () => {
            const testBike = new Bike.Bikes({
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
            const savedBike = await testBike.save();
            
            expect(Assembler.ensurePartsAvailable(savedBike.partsList, 6)).toBe(); // rejects key word necessary when Promises are used
        });*/

    });