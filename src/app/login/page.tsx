'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BackgroundBeams } from "@/components/background-beams";


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
    <div className="relative min-h-screen overflow-hidden font-light bg-[#121212] text-white">
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md px-6 py-12 mx-auto">
          <div className="backdrop-blur-sm bg-[#121212]/30 rounded-3xl shadow-2xl shadow-[#00000050] p-12 border border-white/10">
            <div className="text-center space-y-6 mb-8">
              <div className="flex justify-center mb-6">
                <img
                  src="/logo-light.svg"
                  alt="ChainStock Logo"
                  className="w-12 h-12 animate-float cursor-pointer"
                  onClick={() => router.push('/')}
                />
              </div>
              <h1 className="text-4xl font-bold tracking-[0.2em] uppercase text-[#E0E0E0]">
                Chain<span className="text-[#2D5BFF] font-black">Stock</span>
              </h1>
              <h2 className="text-xl font-medium tracking-[0.3em] uppercase text-[#BDBDBD]">
                登录账户
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-light mb-2 tracking-wide text-[#8A8A8A]">
                  邮箱
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1A1A1A]/30 border border-white/10 rounded-full px-6 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#2D5BFF]/50 focus:ring-1 focus:ring-[#2D5BFF]/50 transition-all duration-300"
                  placeholder="请输入邮箱"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-light mb-2 tracking-wide text-[#8A8A8A]">
                  密码
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1A1A1A]/30 border border-white/10 rounded-full px-6 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#2D5BFF]/50 focus:ring-1 focus:ring-[#2D5BFF]/50 transition-all duration-300"
                  placeholder="请输入密码"
                />
              </div>

              {error && (
                <div className="text-[#00FFE0] text-sm font-light text-center">
                  {error}
                </div>
              )}

              <div className="pt-4">
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full bg-[#2D5BFF]/10 hover:bg-[#2D5BFF]/20 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg shadow-[#00000050] border border-[#2D5BFF]/30 hover:border-[#2D5BFF]/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '登录中...' : '登录'}
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={() => router.push('/register')}
                  className="text-white/70 hover:text-[#2D5BFF] text-sm font-medium transition-colors duration-300"
                >
                  还没有账户？立即注册
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}



