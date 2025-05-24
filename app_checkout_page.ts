'use client';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '@/hooks/useCart';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Checkout() {
  const { cart, clearCart } = useCart(); // Sử dụng hook để quản lý giỏ hàng
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart }),
    });
    const { id } = await response.json();
    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId: id });
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Thanh toán</h1>
      <div>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.name}</span>
            <span>{item.price} VNĐ</span>
          </div>
        ))}
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? 'Đang xử lý...' : 'Thanh toán với Stripe'}
        </button>
      </div>
    </div>
  );
}