import { NextApiRequest } from 'next';

declare module 'next' {
  interface NextApiRequest {
    user?: any; // 根据需要定义 user 的具体类型
  }
} 