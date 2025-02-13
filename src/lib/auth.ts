import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jwt from 'jsonwebtoken'


// JWT 密钥，应该存储在环境变量中
const JWT_SECRET = process.env.JWT_SECRET || 'secret-key'

// JWT Token 类型定义
export interface JWTPayload {
  userId: string
  email: string
  role: string
  iat?: number
  exp?: number
}

// 生成 JWT token
export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET 未定义')
  }
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' })
}

// 验证 JWT token
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as unknown as JWTPayload
    return decoded
  } catch (error) {
    return null
  }
}

// 从请求中获取 token
export function getTokenFromRequest(request: NextRequest): string | null {
  // 从 Authorization 头获取
  const authHeader = request.headers.get('authorization')
  console.log('Auth header:', authHeader) // 添加调试日志
  
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  
  // 从 cookie 获取
  const token = request.cookies.get('token')
  console.log('Cookie token:', token?.value) // 添加调试日志
  
  return token?.value || null
}

// 认证中间件
export async function authMiddleware(request: NextRequest) {
  console.log('Request path:', request.nextUrl.pathname)
  
  // 获取token
  const token = getTokenFromRequest(request)
  console.log('Found token:', !!token)

  // 即使是公开路由,如果提供了有效token也要解析
  if(token) {
    const payload = verifyToken(token)
    console.log('Token payload:', payload)

    if(payload) {
      // 有效token,添加用户信息到header
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-user-id', payload.userId)
      requestHeaders.set('x-user-role', payload.role)
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    }
  }

  // 检查是否是公开路由
  if (isPublicRoute(request.nextUrl.pathname)) {
    return NextResponse.next() // 公开路由无token也可以访问
  }

  // 非公开路由且无有效token
  return NextResponse.json(
    { error: '未授权访问' },
    { status: 401 }
  )
}

// 判断是否是公开路由
function isPublicRoute(pathname: string): boolean {
  const publicRoutes = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/user' // 暂时添加到公开路由用于调试
  ]
  return publicRoutes.includes(pathname)
}
