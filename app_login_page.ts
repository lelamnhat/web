import AuthForm from '@/components/AuthForm';

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Đăng nhập</h1>
      <AuthForm type="login" />
    </div>
  );
}