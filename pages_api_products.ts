import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'GET') {
    const products = await prisma.product.findMany();
    return res.status(200).json(products);
  }

  if (req.method === 'POST') {
    if (!session || session.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Không có quyền' });
    }
    const { name, price, stock } = req.body;
    const product = await prisma.product.create({
      data: { name, price, stock },
    });
    return res.status(201).json(product);
  }

  return res.status(405).json({ message: 'Phương thức không được phép' });
}