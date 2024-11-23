import React from 'react';
import { useItems } from '../hooks/useItems';
import ItemList from '../components/items/ItemList';

export const ViewItems: React.FC = () => {

    const { items, loading, error, fetchItems} = useItems();

    return (
      <div>
          <ItemList
            items={items}
            loading={loading}
            error={error}
            onFetchItems={fetchItems}
          />
      </div>
    );
};