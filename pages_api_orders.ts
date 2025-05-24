import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Chưa đăng nhập' });
  }

  if (req.method === 'GET') {
    const orders = await prisma.order.findMany({
      where: { userId: parseInt(session.user.id) },
      include: { products: true },
    });
    return res.status(200).json(orders);
  }

  if (req.method === 'POST') {
    const { products, total } = req.body;
    const order = await prisma.order.create({
      data: {
        userId: parseInt(session.user.id),
        products: { connect: products.map((id) => ({ id })) },
        total,
        status: 'PENDING',
      },
    });
    return res.status(201).json(order);
  }

  return res.status(405).json({ message: 'Phương thức không được phép' });
}