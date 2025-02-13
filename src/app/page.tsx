'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BackgroundBeams } from "@/components/background-beams";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden font-light bg-[#121212] text-white">
      <div className="relative z-10 flex items-center justify-center min-h-screen ">
          <div className="w-full max-w-4xl px-6 py-12 mx-auto">
            <div className="backdrop-blur-sm bg-[#121212]/30 rounded-3xl shadow-2xl shadow-[#00000050] p-12 border border-white/10">
              <div className="text-center space-y-10">
                <div className="space-y-4">
                  <div className="flex justify-center mb-6">
                    <img
                      src="/logo-light.svg"
                      alt="ChainStock Logo"
                      className="w-16 h-16 animate-float cursor-pointer"
                      onClick={() => router.push('/')}
                    />
                  </div>
                  <h1 className="text-6xl font-bold tracking-[0.2em] uppercase text-[#E0E0E0]">
                    Chain<span className="text-[#2D5BFF] font-black">Stock</span>
                  </h1>
                  <h2 className="text-2xl font-medium tracking-[0.3em] uppercase text-[#BDBDBD]">
                    链存优管 — 库存管理系统
                  </h2>
                </div>
                
                <p className="text-lg text-white/80 max-w-2xl mx-auto font-normal tracking-wider leading-relaxed text-[#8A8A8A]">
                  高效、智能的库存管理解决方案，助力企业实现数字化转型
                </p>
                
                {!isLoggedIn ? (
                  <div className="space-x-8 pt-4">
                    <button
                      onClick={() => router.push('/login')}
                      className="bg-[#1A1A1A]/30 hover:bg-[#1A1A1A]/40 text-white font-semibold py-4 px-10 rounded-full backdrop-blur-md transition-all duration-300 hover:shadow-lg shadow-[#00000050] border border-white/10 hover:border-[#2D5BFF]/30"
                    >
                      登录系统
                    </button>
                    <button
                      onClick={() => router.push('/register')}
                      className="bg-[#2D5BFF]/10 hover:bg-[#2D5BFF]/20 text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 hover:shadow-lg shadow-[#00000050] border border-[#2D5BFF]/30 hover:border-[#2D5BFF]/50"
                    >
                      注册账号
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6 pt-4">
                    <button
                      onClick={() => router.push('/dashboard')}
                      className="bg-[#2D5BFF]/10 hover:bg-[#2D5BFF]/20 text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 hover:shadow-lg shadow-[#00000050] border border-[#2D5BFF]/30 hover:border-[#2D5BFF]/50 w-full max-w-xs mx-auto"
                    >
                      进入系统
                    </button>
                    <button
                      onClick={() => {
                        localStorage.removeItem('token');
                        setIsLoggedIn(false);
                      }}
                      className="bg-[#1A1A1A]/30 hover:bg-[#1A1A1A]/40 text-white/80 font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg shadow-[#00000050] border border-white/10 w-full max-w-xs mx-auto"
                    >
                      退出登录
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}