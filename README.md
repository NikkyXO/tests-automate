# Full-Stack Application
## Prerequisites

 - Node.js (v16+)
 - npm

### Backend Setup

 1. Clone the repository
 2. Navigate to backend directory

```bash
$ cd test_api
$ npm install
$ npm run start:dev
```
### Frontend Setup 

 1. Navigate to frontend directory

```bash
cd test_ui
npm install
npm run dev
```

### Running Tests


#### Backend Tests
1. Navigate to the backend directory
```bash
cd test_api
npm install
```
2. Run Jest test
```bash
npm run test
```
3. Run End-to-End (E2E) tests
```bash
npm run test:e2e
```
4. Run Cypress tests
<br/>
 
 **Note: Stop any running instances of cypress before switching environments**

```bash
npm run test:cypress
```



### Frontend Tests
1. Navigate to the Frontend directory
```bash
cd test_ui
npm install
```

2. Run Cypress tests
<br/>

 **Note: Stop any running instances of cypress before switching environments**
```bash
npm run dev | npm run dev -- --host  ['to expose port to cypress']
npm run cypress | npx cypress open
```

