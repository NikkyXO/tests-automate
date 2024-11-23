import React, { useState } from "react";
import { useItems } from "../../hooks/useItems";
import { FormField, Item } from "../../types";
import { GenericForm } from "./CustomForm";

interface ItemEditFormProps {
  item: Item;
}

export const ItemEditForm: React.FC<ItemEditFormProps> = ({ item }) => {
  const { updateItem } = useItems();
  const [formData, setFormData] = useState({
    id: item.id,
    name: item.name,
    description: item.description,
  });


  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const editFormFields: FormField[] = [
    {
      type: "text",
      placeholder: "name",
      value: formData.name,
      onChange: (e) => handleChange("name", e.target.value),
    },
    {
      type: "text",
      placeholder: "description",
      value: formData.description,
      onChange: (e) => handleChange("description", e.target.value),
    },
  ];

  //   onSubmit={async () => {
  //     return await updateItem(formData.id, {
  //       name: formData.name,
  //       description: formData.description,
  //     });
  //   }}

  return (
    <GenericForm
      className="mt-10"
      fields={editFormFields}
      // onSubmit={async (formData) => {
      //   return await updateItem(formData.id, {name: formData.name, description: formData.description});
      // }}
      onSubmit={async () => {
        return await updateItem(formData.id, {
          name: formData.name,
          description: formData.description,
        });
      }}
      submitButtonText="Update Item"
      successMessage="Update Successful!"
      successRedirectPath="/items"
    />
  );
};
