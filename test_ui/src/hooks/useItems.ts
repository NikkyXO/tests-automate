import { useState } from 'react';
import { Item, ItemCreateData } from '../types';
import { fetchItems as apiFetchItems, createItem as apiCreateItem, updateItem as apiUpdateItem, deleteItem as apiDeleteItem } from '../services/api';

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await apiFetchItems();
      setItems(data);
    } catch (err) {
      setError(`Failed to fetch items: error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (itemData: ItemCreateData) => {
    try {
      await apiCreateItem(itemData);
      return true;
    } catch (err) {
      setError(`Failed to create item error: ${err}`);
      return false;
    }
  };

  const updateItem = async (id: string, itemData: ItemCreateData) => {
    try {
      const updatedItem = await apiUpdateItem(id, itemData);
      setItems(items.map((item) => (item.id === id ? updatedItem : item)));
      return true;
    } catch (err) {
      setError(`Failed to update item error: ${err}`);
      return false;
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await apiDeleteItem(id);
      return true;
    } catch (err) {
      setError(`Failed to delete item error: ${err}`);
      return false;
    }
  };

  return { items, loading, error, fetchItems, createItem, updateItem, deleteItem };
};