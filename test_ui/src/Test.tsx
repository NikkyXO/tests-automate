// # Project Structure
// /src
// ├── components
// │   ├── forms
// │   │   ├── LoginForm.tsx
// │   │   └── ItemForm.tsx
// │   ├── items
// │   │   ├── ItemList.tsx
// │   │   └── ItemCard.tsx
// │   └── layout
// │       ├── Header.tsx
// │       └── PrivateRoute.tsx
// ├── context
// │   └── AuthContext.tsx
// ├── hooks
// │   ├── useAuth.ts
// │   └── useItems.ts
// ├── pages
// │   ├── Login.tsx
// │   ├── Dashboard.tsx
// │   └── NotFound.tsx
// ├── services
// │   ├── api.ts
// │   └── auth.ts
// ├── types
// │   └── index.ts
// └── App.tsx

// # First, let's define our types (types/index.ts)
export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  userId: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// # Context setup (context/AuthContext.tsx)
// import React, { createContext, useState, useContext } from 'react';
// import { User, AuthContextType } from '../types';
// import { loginUser } from '../services/auth';

// export const AuthContext = createContext<AuthContextType | null>(null);



// # Custom hooks (hooks/useAuth.ts)


// # Custom hooks (hooks/useItems.ts)


// # API Service (services/api.ts)


// # Components (components/forms/LoginForm.tsx)


// # Pages (pages/Dashboard.tsx)


// # Main App (App.tsx)
// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import { PrivateRoute } from './components/layout/PrivateRoute';
// import { Login } from './pages/Login';
// import { Dashboard } from './pages/Dashboard';
// import { NotFound } from './pages/NotFound';

// const App: React.FC = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Switch>
//           <Route exact path="/login" component={Login} />
//           <PrivateRoute exact path="/" component={Dashboard} />
//           <Route component={NotFound} />
//         </Switch>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;


// export const isApiError = (error: any): error is Error & { response?: { data: { message: string } } } => {
//   return error instanceof Error && 'response' in error;
// };

// export const handleAuthError = (error: unknown): string => {
//   if (isApiError(error)) {
//     return error.response?.data?.message || error.message;
//   }
//   return 'An unexpected error occurred';
// };
