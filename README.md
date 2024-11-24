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
```bash
cd test_api
npm install
npm run test
```
  - To run jest tests
```bash
npm run test:e2e
```

- To run Cypress tests
```bash
npm run test:cypress
```



### Frontend Tests
```bash
cd test_ui
npm install
 ```

 - To run Cypress tests
```bash
npm run dev or
npm run dev -- --host  ['to expose port to cypress']
npx cypress open
```

