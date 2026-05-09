'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginInput } from '../../../../../lib/validations'
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react'
import { cn } from '../../../../../utils/cn'

export default function AdminLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          method: 'GET',
          credentials: 'include',
        })

        if (res.ok) {
          router.replace('/admin/dashboard')
        }
      } catch (error) {
        // ignore error → stay on login page
      } 
    }

    checkAuth()
  }, [router])

  const onSubmit = async (data: LoginInput) => {
    setServerError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      // ✅ proper error handling
      if (!res.ok) {
        setServerError(json.message || "Login failed");
        return;
      }

      // ✅ no token handling needed (cookie-based auth)
      router.push("/admin/dashboard");
      router.refresh();
    } catch (error) {
      setServerError("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4"
      style={{ backgroundImage: 'linear-gradient(135deg, #0c0a09 0%, #1c1917 50%, #0f0e0d 100%)' }}>
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'linear-gradient(#9a7449 1px, transparent 1px), linear-gradient(90deg, #9a7449 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 border-2 border-brand-500 flex items-center justify-center mx-auto mb-4">
            <span className="text-brand-400 text-lg font-bold tracking-wider">AS</span>
          </div>
          <h1 className="text-2xl font-light text-white tracking-wider" style={{ fontFamily: 'var(--font-display)' }}>
            Archform Studio
          </h1>
          <p className="text-stone-500 text-xs tracking-[0.2em] uppercase mt-1">Admin Portal</p>
        </div>

        {/* Card */}
        <div className="bg-stone-900 border border-stone-800 p-8 shadow-2xl">
          <h2 className="text-lg font-medium text-white mb-1">Welcome back</h2>
          <p className="text-stone-400 text-sm mb-8">Sign in to access the admin panel.</p>

          {serverError && (
            <div className="flex items-center gap-3 bg-red-950 border border-red-800 text-red-400 px-4 py-3 text-sm rounded mb-6">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm text-stone-400 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="admin@archformstudio.com"
                  className={cn(
                    'w-full bg-stone-800 border text-white pl-10 pr-4 py-3 text-sm rounded placeholder:text-stone-600',
                    'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all',
                    errors.email ? 'border-red-700' : 'border-stone-700'
                  )}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-stone-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={cn(
                    'w-full bg-stone-800 border text-white pl-10 pr-12 py-3 text-sm rounded placeholder:text-stone-600',
                    'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all',
                    errors.password ? 'border-red-700' : 'border-stone-700'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed
                         text-white py-3 text-sm font-medium tracking-widest uppercase transition-colors duration-200 rounded"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-stone-600 text-xs mt-6">
            Default: admin@architectfirm.com / Admin@123
          </p>
        </div>
      </div>
    </div>
  )
}