import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Không có quyền' });
  }

  if (req.method === 'GET') {
    const users = await prisma.user.findMany({ select: { id: true, email: true, name: true, role: true } });
    return res.status(200).json(users);
  }

  return res.status(405).json({ message: 'Phương thức không được phép' });
}