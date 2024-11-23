import React from "react";
import { useItems } from "../../hooks/useItems";
import { FormField } from "../../types";
import { GenericForm } from "./CustomForm";


export const ItemCreateForm: React.FC = () => {
  const { createItem } = useItems();

  const createItemFields: FormField[] = [
    { type: 'text', placeholder: 'name', value: '', onChange: () => {} },
    { type: 'text', placeholder: 'description', value: '', onChange: () => {} }
  ];

  return (
      <GenericForm
      className="mt-10"
        fields={createItemFields}
        onSubmit={async (formData) => {
          return await createItem({ name: formData.name, description: formData.description });
        }}
        submitButtonText="Create New Item"
        successMessage="Item created successfully!"
        successRedirectPath="/items"
      />
  );
};
