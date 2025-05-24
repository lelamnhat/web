import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Bảng điều khiển quản trị</h1>
      <nav className="flex gap-4">
        <Link href="/admin/products">Quản lý sản phẩm</Link>
        <Link href="/admin/users">Quản lý người dùng</Link>
      </nav>
    </div>
  );
}