import React, { useEffect, useState } from "react";
import { useItems } from "../hooks/useItems";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../components/items/ItemDetail";
import { Item } from "../types";

export const ViewItem: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getItemById } = useItems();
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      if (id) {
        const item = await getItemById(id);
        setItem(item);
      }
    };
    fetchItem();
  }, [id]);

  return <div>{item && <ItemDetail item={item} />}</div>;
};
