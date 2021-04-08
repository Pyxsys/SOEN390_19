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
    test('throws error when there are insufficient parts to produce a single bike', async () => {
        // creating and saving partsList in DB
        const frame = new BikePart.BikeParts({
            internalId: 'xdf458',
            partType: 'frame',
            price: 45,
            numberOfUnits: 5,
            provider: 'Test Provider',  //refer to supplier

            partDocPath: './', //Path to .pdf file
            partStepPath: './'
        });
        const savedFrame = await frame.save();

        const pedal = new BikePart.BikeParts({
            internalId: 'ejf587',
            partType: 'pedal',
            price: 30,
            numberOfUnits: 5,
            provider: 'Test Provider',  //refer to supplier

            partDocPath: './', //Path to .pdf file
            partStepPath: './'
        });
        const savedPedal = await pedal.save();

        const seat = new BikePart.BikeParts({
            internalId: 'ktr413',
            partType: 'seat',
            price: 25,
            numberOfUnits: 5,
            provider: 'Test Provider',  //refer to supplier

            partDocPath: './', //Path to .pdf file
            partStepPath: './'
        });
        const savedSeat = await seat.save();

        // creating and saving a test Bike in DB
        const testBike = new Bike.Bikes({
            internalId: 'efg567',
            type: 'Mountain Bike',
            price: 400,
            numberOfUnits: 6,
            provider: 'Test Provider',
            bikeDocPath: './',
            partsList: [
                { partInternalId: savedFrame.internalId, amountRequired: 100 }, // requires 100 of each, only have 5 of each
                { partInternalId: savedPedal.internalId, amountRequired: 100 },
                { partInternalId: savedSeat.internalId, amountRequired: 100 }
            ]
        });
        const savedBike = await testBike.save();

        await expect(Assembler.ensurePartsAvailable(savedBike.partsList, 1)).rejects.toThrow(new Error(`Insufficient parts to produce a single bike.`)); // rejects key word necessary when Promises are used
    });

    // Unit Testing: ensurePartsAvailable() returns a result with insufficient_parts set as true when min_possible_assemblies is less than requested_amount.
    /*test('returns a result with insufficient_parts set as true when min_possible_assemblies is less than requested_amount', async () => {
        // creating and saving partsList in DB
        const frame = new BikePart.BikeParts({
            internalId: 'cjk458',
            partType: 'frame',
            price: 45,
            numberOfUnits: 10,
            provider: 'Test Provider',  //refer to supplier

            partDocPath: './', //Path to .pdf file
            partStepPath: './'
        });
        const savedFrame = await frame.save();

        const pedal = new BikePart.BikeParts({
            internalId: 'tgy587',
            partType: 'pedal',
            price: 30,
            numberOfUnits: 10,
            provider: 'Test Provider',  //refer to supplier

            partDocPath: './', //Path to .pdf file
            partStepPath: './'
        });
        const savedPedal = await pedal.save();

        const seat = new BikePart.BikeParts({
            internalId: 'yup413',
            partType: 'seat',
            price: 25,
            numberOfUnits: 10,
            provider: 'Test Provider',  //refer to supplier

            partDocPath: './', //Path to .pdf file
            partStepPath: './'
        });
        const savedSeat = await seat.save();

        // creating and saving a test Bike in DB
        const newTestBike = new Bike.Bikes({
            internalId: 'qwe567',
            type: 'Mountain Bike',
            price: 400,
            numberOfUnits: 6,
            provider: 'Test Provider',
            bikeDocPath: './',
            partsList: [
                { partInternalId: savedFrame.internalId, amountRequired: 5 }, 
                { partInternalId: savedPedal.internalId, amountRequired: 5 },
                { partInternalId: savedSeat.internalId, amountRequired: 5 }
            ]
        });
        const savedBike = await newTestBike.save();

        await expect(Assembler.ensurePartsAvailable(savedBike.partsList, 3)).toBe(true);
    });*/
    });