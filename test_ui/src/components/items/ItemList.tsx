import { ItemCreateForm } from "../forms/ItemCreateForm";
import { useEffect, useState } from "react";
import { ItemDetail } from "./ItemDetail";

interface Item {
  id: string;
  name: string;
  description: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface ItemListProps {
  items: Item[];
  loading: boolean;
  error: string | null;
  onFetchItems: () => void;
}

const ItemList: React.FC<ItemListProps> = ({
  items = [],
  loading,
  error,
  onFetchItems,
}) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);


  useEffect(() => {
    onFetchItems();
  }, []);

  // const handleItemCreate = () => {
  //   setShowAddForm(false);
  //   onFetchItems();
  // };
  const handleBackToList = () => {
    setSelectedItem(null);
    setShowAddForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4 mt-60">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-60"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">
          {typeof error === "string" ? error : "An error occurred"}
        </span>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-30 p-4">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-26 mt-5 border-slate-400 border-b-8 p-4">
        <h1 className="text-2xl font-bold">Items</h1>
        {!showAddForm && !selectedItem && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowAddForm(true)}
          >
            Add Item
          </button>
        )}
        {(showAddForm || selectedItem) && (
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleBackToList}
          >
            Back to List
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="bg-white w-full rounded-lg shadow-md p-6">
        {showAddForm ? (
          <ItemCreateForm />
        ) : selectedItem ? (
          <ItemDetail item={selectedItem} />
        ) : (
          <div>
            {items.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="py-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-gray-500">{item.description}</p>
                      </div>
                      <div>
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="ml-4 bg-gray-300 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded"
                        >
                          View Item
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No items available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>

    // <div>
    //   <div>
    //     <button
    //     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setAddItem(true)}>Add Items</button>

    //   </div>
    //   {addItem ? (
    //     <ItemCreateForm
    //     />
    //   ): (
    //     {items.length > 0 ? (
    //       selectedItem ? (
    //         <ItemDetail item={selectedItem} />
    //       ) : (
    //         <ul>
    //           {items.map((item) => (
    //             <li key={item.id}>
    //               {item.name}
    //               {item.description}
    //               <button onClick={() => setSelectedItem(item)}>View</button>
    //             </li>
    //           ))}
    //         </ul>
    //       )
    //     ) : (
    //       <p>No items available</p>
    //     )}
    //   )}
    //     <ItemCreateForm />

    //   {loading && <div>Loading...</div>}
    //   {error && (
    //     <div>
    //       Error: {typeof error === "string" ? error : "An error occurred"}
    //     </div>
    //   )}

    //   {items.length > 0 ? (
    //     selectedItem ? (
    //       <ItemDetail item={selectedItem} />
    //     ) : (
    //       <ul>
    //         {items.map((item) => (
    //           <li key={item.id}>
    //             {item.name}
    //             {item.description}
    //             <button onClick={() => setSelectedItem(item)}>View</button>
    //           </li>
    //         ))}
    //       </ul>
    //     )
    //   ) : (
    //     <p>No items available</p>
    //   )}
    // </div>
  );
};

export default ItemList;
