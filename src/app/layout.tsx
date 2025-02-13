import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/contexts/theme-provider'

const orbitron = Orbitron({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChainStock | 链存优管",
  description: "高效、智能的库存管理解决方案，助力企业实现数字化转型",
  icons: {
    icon: "/logo-light.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // 立即应用保存的主题，避免闪烁
                const theme = localStorage.getItem('theme') || 'system';
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                document.documentElement.classList.add(theme === 'system' ? systemTheme : theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${orbitron.className} ${inter.className}`}>
        <ThemeProvider defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
