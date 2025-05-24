import { stripe } from '@/lib/stripe';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Phương thức không được phép' });
  }

  const { cart } = req.body;
  const lineItems = cart.map((item) => ({
    price_data: {
      currency: 'vnd',
      product_data: { name: item.name },
      unit_amount: item.price * 100,
    },
    quantity: 1,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${req.headers.origin}/?success=true`,
    cancel_url: `${req.headers.origin}/?canceled=true`,
  });

  return res.status(200).json({ id: session.id });
}