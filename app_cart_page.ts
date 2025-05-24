'use client';
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Giỏ hàng</h1>
      {cart.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-4">
              <span>{item.name}</span>
              <span>{item.price} VNĐ</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500"
              >
                Xóa
              </button>
            </div>
          ))}
          <Link href="/checkout" className="bg-blue-500 text-white px-4 py-2 rounded">
            Thanh toán
          </Link>
          <button onClick={clearCart} className="ml-4 text-red-500">
            Xóa tất cả
          </button>
        </>
      )}
    </div>
  );
}