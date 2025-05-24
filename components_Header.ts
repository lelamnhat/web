'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingCart } from 'lucide-react';

export default function Header({ session }) {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Shop Web</Link>
        <nav className="flex gap-4">
          <Link href="/">Trang chủ</Link>
          <Link href="/cart">Giỏ hàng <ShoppingCart className="inline" /></Link>
          {session ? (
            <>
              <Link href="/account">Tài khoản</Link>
              {session.user.role === 'ADMIN' && <Link href="/admin">Quản trị</Link>}
              <button onClick={() => signOut()}>Đăng xuất</button>
            </>
          ) : (
            <>
              <Link href="/login">Đăng nhập</Link>
              <Link href="/register">Đăng ký</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}