'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { WavyBackground } from "@/components/ui/wavy-background";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleNavigation = (path: string) => {
    // 添加淡出效果
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
      router.push(path);
      // 重置opacity
      document.body.style.opacity = '1';
    }, 300);
  };

  return (
    <WavyBackground>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-12">
          <div className="space-y-6">
            <div className="flex justify-center mb-8">
              <img
                src="/logo-light.svg"
                alt="ChainStock Logo"
                className="w-20 h-20 animate-float cursor-pointer [filter:brightness(0)_saturate(100%)_invert(39%)_sepia(64%)_saturate(2619%)_hue-rotate(211deg)_brightness(101%)_contrast(101%)] dark:[filter:brightness(0)_invert(1)]"
                onClick={() => handleNavigation('/')}
              />
            </div>
            <h1 className="text-7xl font-black tracking-wider text-slate-800 dark:text-white">
              Chain<span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">Stock</span>
            </h1>
            <h2 className="text-3xl font-medium tracking-[0.3em] text-slate-600 dark:text-slate-200">
              链存优管 — 库存管理系统
            </h2>
          </div>
          
          <p className="text-xl max-w-2xl mx-auto font-normal tracking-wide text-slate-600 dark:text-slate-300">
            高效、智能的库存管理解决方案，助力企业实现数字化转型
          </p>
          
          {!isLoggedIn ? (
            <div className="space-x-8 pt-8">
              <button
                onClick={() => handleNavigation('/login')}
                className="w-40 bg-primary/10 hover:bg-primary/20 text-primary font-medium py-3 rounded-full transition-all border border-primary/30 hover:border-primary/50"
              >
                登录系统
              </button>
              <button
                onClick={() => handleNavigation('/register')}
                className="w-40 bg-white/10 dark:bg-black/10 text-slate-800 dark:text-white font-medium py-3 rounded-full transition-all border border-slate-350/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/20"
              >
                注册账号
              </button>
            </div>
          ) : (
            <div className="space-x-8 pt-8">
              <button
                onClick={() => handleNavigation('/dashboard')}
                className="w-40 bg-primary/10 hover:bg-primary/20 text-primary font-medium py-3 rounded-full transition-all border border-primary/30 hover:border-primary/50"
              >
                进入系统
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  setIsLoggedIn(false);
                }}
                className="w-40 bg-white/10 dark:bg-black/10 text-slate-800 dark:text-white font-medium py-3 rounded-full transition-all border border-slate-350/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/20"
              >
                退出登录
              </button>
            </div>
          )}
        </div>
      </div>
    </WavyBackground>
  );
}