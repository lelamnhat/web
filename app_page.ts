import ProductCard from '@/components/ProductCard';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const products = await prisma.product.findMany(); // Lấy danh sách sản phẩm từ DB

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sản phẩm của chúng tôi</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} /> // Hiển thị từng sản phẩm
        ))}
      </div>
    </div>
  );
}