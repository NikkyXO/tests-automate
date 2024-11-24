import { useItems } from "../../hooks/useItems";
import { Item } from "../../types";
import { useState } from "react";
import { ItemEditForm } from "../forms/ItemEditForm";
import { useNavigate } from "react-router-dom";

export const ItemDetail: React.FC<{ item: Item }> = ({ item }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { deleteItem } = useItems();
  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      setError("");
      setSuccessMessage("");
      const success = await deleteItem(id);
      if (success) {
        setSuccessMessage("Item deleted successfully!");
        navigate('/items');
      }
    } catch (error) {
      console.log(error);
      setError("Unable to delete Data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )}
      {successMessage && (
        <div className="p-2 bg-green-100 text-green-700">{successMessage}</div>
      )}
      {error && <div className="p-2 bg-red-100 text-red-700">{error}</div>}
      {showAddForm ? (
        <div>
          <ItemEditForm
            item={item}
          />
        </div>
      ) : (
        <div className="p-9 mt-10 flex flex-col justify-between space-y-6 bg-slate-800 text-white">
          <h1 className="text-2xl mx-auto">{item.name}</h1>
          <p className="text-lg mx-auto">{item.description}</p>

          <div className="flex flex-col mx-auto gap-y-3">
            <p className="text-sm mx-auto">Created by: {item.userId}</p>
            <p className="text-sm mx-auto">Created At: {item.createdAt}</p>
            <p className="text-sm mx-auto">Updated At: {item.updatedAt}</p>
          </div>
          <div className="flex flex-col mx-auto gap-y-3 w-full">
            <button
              className=" mt-10 bg-blue-500 w-3/4 mx-auto p-2 rounded-md"
              onClick={() => setShowAddForm(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 w-3/4 p-2 mx-auto rounded-md"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
