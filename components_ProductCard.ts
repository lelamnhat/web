'use client';
import { useCart } from '@/hooks/useCart';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p>{product.description}</p>
      <p className="text-lg font-bold">{product.price} VNĐ</p>
      <p>Tồn kho: {product.stock}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Thêm vào giỏ hàng
      </button>
    </div>
  );
}