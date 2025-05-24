'use client';
import { useState, useEffect } from 'react';
import { prisma } from '@/lib/prisma';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addProduct = async () => {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: parseFloat(price), stock: parseInt(stock) }),
    });
    const newProduct = await response.json();
    setProducts([...products, newProduct]);
    setName('');
    setPrice('');
    setStock('');
  };

  const deleteProduct = async (id: number) => {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Quản lý sản phẩm</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Giá"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Tồn kho"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={addProduct} className="bg-blue-500 text-white px-4 py-2 rounded">
          Thêm sản phẩm
        </button>
      </div>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="flex justify-between mb-2">
            <span>{product.name} - {product.price} VNĐ - Tồn: {product.stock}</span>
            <button
              onClick={() => deleteProduct(product.id)}
              className="text-red-500"
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}