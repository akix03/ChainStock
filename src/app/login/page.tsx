'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WavyBackground } from "@/components/ui/wavy-background";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);

        // 存储用户信息到 localStorage
        localStorage.setItem('userInfo', JSON.stringify(data.userInfo));
        router.push('/dashboard');
      } else {
        setError(data.error || '登录失败');
      }
    } catch (error) {
      setError('登录过程中发生错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <WavyBackground>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <div className="backdrop-blur-md bg-white/10 dark:bg-black/20 rounded-3xl shadow-xl border border-white/20 dark:border-white/10 p-12">
            <div className="text-center space-y-6 mb-8">
              <div className="flex justify-center mb-6">
                <img
                  src="/logo-light.svg"
                  alt="ChainStock Logo"
                  className="w-16 h-16 animate-float cursor-pointer [filter:brightness(0)_saturate(100%)_invert(39%)_sepia(64%)_saturate(2619%)_hue-rotate(211deg)_brightness(101%)_contrast(101%)] dark:[filter:brightness(0)_invert(1)]"
                  onClick={() => router.push('/')}
                />
              </div>
              <h1 className="text-4xl font-bold tracking-wider text-slate-800 dark:text-white">
                Chain<span className="text-primary">Stock</span>
              </h1>
              <h2 className="text-xl font-medium tracking-wider text-slate-600 dark:text-slate-200">
                登录账户
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-200">
                  邮箱
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/20 dark:bg-black/20 border border-slate-200/20 dark:border-white/10 rounded-full px-6 py-3 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder="请输入邮箱"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-600 dark:text-slate-300">
                  密码
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/10 dark:bg-black/10 border border-slate-200/20 dark:border-white/10 rounded-full px-6 py-3 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder="请输入密码"
                />
              </div>

              {error && (
                <div className="text-red-500 dark:text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <div className="pt-4">
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full bg-primary/10 hover:bg-primary/20 text-primary font-medium py-3 rounded-full transition-all border border-primary/30 hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '登录中...' : '登录'}
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={() => router.push('/register')}
                  className="text-slate-600 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors"
                >
                  还没有账户？立即注册
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WavyBackground>
  );
}



