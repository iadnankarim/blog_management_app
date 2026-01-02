'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { z } from 'zod';

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError('');
      setSuccess('');

      // Direct API call for registration (without auto-login)
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      // Show success message and redirect to login
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg text-sm border border-green-200 dark:border-green-800">
          {success}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-medium">Full Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          className="border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 h-11"
          {...register('name')}
        />
        {errors.name && <p className="text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 h-11"
          {...register('email')}
        />
        {errors.email && <p className="text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 font-medium">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Create a strong password"
          className="border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 h-11"
          {...register('password')}
        />
        {errors.password && <p className="text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300 font-medium">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Re-enter your password"
          className="border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 h-11"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && <p className="text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>}
      </div>

      <Button
        type="submit"
        className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 h-11 font-medium text-base mt-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
}
