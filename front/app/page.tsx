"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface Item {
  id: number;
  name: string;
  description: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const fetchItems = async () => {
    const res = await axios.get<Item[]>("http://localhost:8000/items/");
    setItems(res.data);
  };

  const addItem = async () => {
    const newItem: Item = { id: Date.now(), name, description };
    await axios.post("http://localhost:8000/items/", newItem);
    setName("");
    setDescription("");
    fetchItems();
  };

  const deleteItem = async (id: number) => {
    await axios.delete(`http://localhost:8000/items/${id}`);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">CRUD with FastAPI</h1>

      <div className="my-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-1 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-1 mr-2"
        />
        <button onClick={addItem} className="bg-blue-500 text-white p-1">
          Add Item
        </button>
      </div>

      <ul>
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center">
            <span>{item.name}: {item.description}</span>
            <button
              onClick={() => deleteItem(item.id)}
              className="bg-red-500 text-white p-1 ml-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
