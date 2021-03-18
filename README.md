# SOEN390_19
Winter 2021 SOEN 390 minicap repository for Kap Industries (Team 19).
Concordia University.

# Intallation/Setup Guide
## Via NPM
### Requirements
- Node.js is installed
- MongoDB is installed

### Steps
1. Download/Clone the project locally
2. Open a terminal (*eg. Cmd on windows*)
3. Navigate to the project root (*C:/.../SOEN390_19/*).
4. **Client Setup**  
  4.1. Go into the *Client/* directory: `cd Client/`  
  4.2. Install Client's dependencies: `npm install`  
  4.3. Ensure the *node_modules* directory was generated.  
  4.4. Start running Client on localhost:3000: `npm start`  
  (React should've opened a new browser window)  
  4.5. Move process to the background by hitting *Ctrl+Z*.
  4.6. Return active directory to project root: `cd ..`
5. **Server Setup**  
  5.1. Go into the *Server/* directory: `cd Server/`  
  5.2. Install Server's dependencies: `npm install`  
  5.3. Ensure the *node_modules* directory was generated.  
  5.4. Start running Server on localhost:5000: `npm start`  
  5.5. Move process to the background by hitting *Ctrl+Z*.
  5.6. Return active directory to project root: `cd ..`
6. Both Client and Server are setup and running
7. Connect to Client (if not already) in a browser using the link: [localhost:3000](http://localhost:3000)
#### Running tests with jest
1. Open a terminal (*eg. Cmd on windows*)
2. Navigate to the project root (*C:/.../SOEN390_19/*).
3. Navigate to the test directory: `cd Server/__tests__/`
4. Run jest with: `npm test`
5. Tests suites are run with the output displayed to the terminal.

## Via Docker
### Requirements
- Docker is running
### Steps
1. Download/Clone the project locally  
2. Open a terminal (*eg. Cmd on windows*)  
3. Navigate to the project root (*C:/.../SOEN390_19/*).
4. Build a fresh container docker using: `docker-compose build --no-cache`
5. Input the following command: `docker-compose up`  
6. Wait for the containers & images to to generate.  
7. Assure that there are three containers running in *SOEN390_19*:  
    - *kapp-docker-react* on port 80  
    - *kapp-docker-express* on port 5000  
    - *mongo* on port 27017  
8.  Client, Server, and DB are running  
9. Connect to Client in a browser using the link: [localhost](http://localhost) 

## Admin Login  
You can login into the application by using the following credentials:  
- *Email:* admin@email.com
- *Password:* administrator
