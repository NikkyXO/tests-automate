# Full-Stack Application
## Prerequisites

 - Node.js (v16+)
 - npm

### Backend Setup

 - Clone the repository
 - Navigate to backend directory -i.e /test_api

```bash
$ cd test_api
$ npm install
$ npm run start:dev
```
### Frontend Setup 

 - Navigate to frontend directory -i.e /test_ui

```bash
cd test_ui
npm install
npm start
```

### Running Tests
### Backend Tests
  - Running jest tests
```bash
cd test_api
npm run test
npm run test:e2e
```

- Running Cypress tests
```bash
cd test_api
npm run test:e2e:cypress
```
or 
```bash
 npx cypress open
```


### Frontend Tests
```bash
cd test_ui
npm run dev -- --host  ['to expose port to cypress']
 npx cypress open
 ```

