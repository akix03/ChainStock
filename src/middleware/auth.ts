import { NextRequest, NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken';

export async function validateToken(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: '未提供认证令牌' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch (error) {
    return NextResponse.json(
      { error: '无效的认证令牌' },
      { status: 401 }
    );
  }
} 