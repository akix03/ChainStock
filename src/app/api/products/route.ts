import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { validateToken } from '@/middleware/auth';

// 获取商品列表
export async function GET(request: NextRequest) {
  try {
    // 验证 token
    const authResult = await validateToken(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    // 获取查询参数
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    // 构建查询条件
    const where = {
      ...(category && { category }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { sku: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    // 查询总数
    const total = await prisma.product.count({ where });

    // 查询数据
    const products = await prisma.product.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('获取商品列表失败:', error);
    return NextResponse.json(
      { error: '获取商品列表失败' },
      { status: 500 }
    );
  }
}

// 添加商品
export async function POST(request: NextRequest) {
  try {
    // 验证 token
    const authResult = await validateToken(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const data = await request.json();

    // 验证必填字段
    const requiredFields = ['name', 'sku', 'category', 'price', 'stock'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} 是必填字段` },
          { status: 400 }
        );
      }
    }

    // 检查 SKU 是否已存在
    const existingProduct = await prisma.product.findUnique({
      where: { sku: data.sku },
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: '商品编号已存在' },
        { status: 400 }
      );
    }

    // 创建商品
    const product = await prisma.product.create({
      data: {
        name: data.name,
        sku: data.sku,
        category: data.category,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('创建商品失败:', error);
    return NextResponse.json(
      { error: '创建商品失败' },
      { status: 500 }
    );
  }
} 