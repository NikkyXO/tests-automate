import React from 'react';
import { ItemCreateForm } from '../components/forms/ItemCreateForm';

export const AddItem: React.FC = () => {

  return (
    <div>
      <main className="container m-auto p-4 mt-40">
        <p className='text-3xl bold mx-auto mb-5'>Create an Item</p>
        <ItemCreateForm
        />
      </main>
    </div>
  );
};