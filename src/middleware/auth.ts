import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET 未定义');
}