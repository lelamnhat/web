import AuthForm from '@/components/AuthForm';

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Đăng ký</h1>
      <AuthForm type="register" />
    </div>
  );
}