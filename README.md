Full-Stack Application
Prerequisites

Node.js (v16+)
npm

Backend Setup

Clone the repository
Navigate to backend directory

bash
cd backend
npm install
npm run start:dev
Frontend Setup

Navigate to frontend directory

bash
cd frontend
npm install
npm start
Running Tests
Backend Tests
bashCopy# Run Jest tests
npm run test
npm run test:e2e
Frontend Tests
bash

# Backend Tests
npm run test

# Frontend Tests
npm run test

# Cypress E2E
npx cypress open
# Run Cypress tests

 "test:e2e": "cypress open",
  "test:e2e:headless": "cypress run"

npm run cypress:open
Environment Variables
Create .env files in both backend and frontend:
Backend .env
CopyDATABASE_URL=postgresql://user:password@localhost:5432/mydb
JWT_SECRET=your_jwt_secret
Frontend .env
CopyREACT_APP_API_URL=http://localhost:3000/api
Docker Deployment
bash
docker-compose up --build
API Endpoints

/auth/login: User authentication
/auth/register: User registration
/items: CRUD operations for items
/users: User management

Technology Stack

Backend: NestJS, TypeORM, Passport.js
Frontend: React, Axios
Testing: Jest, Cypress
Authentication: JWT


npm run dev -- --host
