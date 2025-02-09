'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import ProductTable from '@/components/ProductTable';
import ProductForm from '@/components/ProductForm';

export default function ProductsPage() {
  // 商品列表
  const [products, setProducts] = useState<Product[]>([]);
  // 是否打开表单
  const [isFormOpen, setIsFormOpen] = useState(false);
  // 编辑的商品
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // 添加商品
  const handleAddProduct = (product: Product) => {
    setProducts([...products, { ...product, id: Date.now().toString() }]);
    setIsFormOpen(false);
  };

  // 编辑商品
  const handleEditProduct = (product: Product) => {
    setProducts(products.map(p => p.id === product.id ? product : p));
    setEditingProduct(null);
  };

  // 删除商品
  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // 返回商品管理页面
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">商品管理</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          添加商品
        </button>
      </div>

      <ProductTable
        products={products}
        onEdit={setEditingProduct}
        onDelete={handleDeleteProduct}
      />

      {(isFormOpen || editingProduct) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <ProductForm
            onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingProduct(null);
            }}
            initialData={editingProduct}
          />
        </div>
      )}
    </div>
  );
} 