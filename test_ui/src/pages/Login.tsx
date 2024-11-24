import React from 'react';
import { LoginForm } from '../components/forms/LoginForm';

export const Login: React.FC = () => {

  return (
    <div className='w-screen h-screen bg-gray-900 flex flex-col'>
        <LoginForm 
        />
    </div>
  );
};