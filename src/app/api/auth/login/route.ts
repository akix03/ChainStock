import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: '邮箱和密码是必填字段' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: '密码错误' }, { status: 401 });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET 未定义');
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '24h' });
    return NextResponse.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  
  } catch (error) {
    console.error('登录失败:', error);
    return NextResponse.json({ error: '登录失败' }, { status: 500 });
  }
}