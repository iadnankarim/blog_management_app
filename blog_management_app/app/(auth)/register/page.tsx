import RegisterForm from '@/components/auth/RegisterForm';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-24 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">Create Account</h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">Start sharing your stories with the world</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          <RegisterForm />
        </div>

        <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-gray-900 dark:text-gray-100 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
