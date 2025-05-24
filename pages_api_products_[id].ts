import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Không có quyền' });
  }

  const { id } = req.query;

  if (req.method === 'DELETE') {
    await prisma.product.delete({ where: { id: parseInt(id as string) } });
    return res.status(204).end();
  }

  return res.status(405).json({ message: 'Phương thức không được phép' });
}