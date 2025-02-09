import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChainStock - 链存优管",
  description: "一个基于NextJS和区块链的库存管理系统",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>
        {children}
      </body>
    </html>
  );
}
