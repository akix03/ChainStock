import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { validateToken } from '@/middleware/auth';

// 更新商品
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 验证 token
    const authResult = await validateToken(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const data = await request.json();
    const { id } = params;

    // 检查商品是否存在
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: '商品不存在' },
        { status: 404 }
      );
    }

    // 如果更新 SKU，检查是否与其他商品重复
    if (data.sku && data.sku !== existingProduct.sku) {
      const duplicateSku = await prisma.product.findUnique({
        where: { sku: data.sku },
      });

      if (duplicateSku) {
        return NextResponse.json(
          { error: '商品编号已存在' },
          { status: 400 }
        );
      }
    }

    // 更新商品
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        sku: data.sku,
        category: data.category,
        price: data.price ? parseFloat(data.price) : undefined,
        stock: data.stock ? parseInt(data.stock) : undefined,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('更新商品失败:', error);
    return NextResponse.json(
      { error: '更新商品失败' },
      { status: 500 }
    );
  }
}

// 删除商品
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 验证 token
    const authResult = await validateToken(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { id } = params;

    // 检查商品是否存在
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: '商品不存在' },
        { status: 404 }
      );
    }

    // 删除商品
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: '商品已删除' },
      { status: 200 }
    );
  } catch (error) {
    console.error('删除商品失败:', error);
    return NextResponse.json(
      { error: '删除商品失败' },
      { status: 500 }
    );
  }
} 