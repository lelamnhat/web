# Shop Web

Nền tảng thương mại điện tử xây dựng với Next.js, Tailwind CSS, Prisma, NextAuth và Stripe.

## Cài đặt

1. **Cài đặt thư viện**:
   ```bash
   npm install
   ```

2. **Thiết lập cơ sở dữ liệu**:
   ```bash
   npx prisma migrate dev
   ```

3. **Chạy server phát triển**:
   ```bash
   npm run dev
   ```

## Biến môi trường
Sao chép `.env.example` thành `.env` và cập nhật các giá trị:
- `DATABASE_URL`: URL cơ sở dữ liệu PostgreSQL.
- `NEXTAUTH_SECRET`: Khóa bí mật cho NextAuth.
- `STRIPE_SECRET_KEY`: Khóa bí mật Stripe.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Khóa công khai Stripe.

## Công nghệ sử dụng
- Next.js 14+ (App Router)
- Tailwind CSS
- Prisma ORM
- NextAuth (Xác thực)
- Stripe (Thanh toán)