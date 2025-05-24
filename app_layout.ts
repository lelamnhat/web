import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';
import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const inter = Inter({ subsets: ['latin'] });

// Cấu hình SEO cho trang
export const metadata = {
  title: 'Shop Web - Cửa hàng trực tuyến',
  description: 'Nền tảng thương mại điện tử hiện đại với Next.js',
  openGraph: {
    title: 'Shop Web',
    description: 'Mua sắm các sản phẩm yêu thích trực tuyến',
    url: 'https://shop-web.com',
    type: 'website',
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions); // Lấy thông tin phiên đăng nhập

  return (
    <html lang="vi">
      <body className={inter.className}>
        <Header session={session} /> {/* Thanh điều hướng */}
        <main className="min-h-screen">{children}</main> {/* Nội dung chính */}
        <Footer /> {/* Chân trang */}
      </body>
    </html>
  );
}